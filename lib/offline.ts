const DB_NAME = "avora-offline-v2";
const DB_VERSION = 2;
const ACTION_STORE = "pending-actions";
const LESSON_STORE = "tutor-lessons";

type SyncAction = {
  id: string;
  url: string;
  method: "POST";
  body: Record<string, unknown>;
  queuedAt: number;
  attempts: number;
  dedupeKey?: string;
};

type CachedLesson = {
  id: string;
  subject: string;
  topic: string;
  payload: Record<string, any>;
  cachedAt: number;
  appVersion: string;
};

function requestResult<T = unknown>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("IndexedDB transaction aborted."));
  });
}

export function openOfflineDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("Offline storage is unavailable in this browser."));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(ACTION_STORE)) {
        const actions = db.createObjectStore(ACTION_STORE, { keyPath: "id" });
        actions.createIndex("queuedAt", "queuedAt", { unique: false });
        actions.createIndex("dedupeKey", "dedupeKey", { unique: false });
      }
      if (!db.objectStoreNames.contains(LESSON_STORE)) {
        const lessons = db.createObjectStore(LESSON_STORE, { keyPath: "id" });
        lessons.createIndex("cachedAt", "cachedAt", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function lessonKey(subject: string, topic: string) {
  return `${subject.trim().toLowerCase()}::${(topic || "__catalog__").trim().toLowerCase()}`;
}

export async function cacheTutorLesson(subject: string, topic: string, payload: Record<string, any>, appVersion = "14.1.0") {
  const db = await openOfflineDb();
  const tx = db.transaction(LESSON_STORE, "readwrite");
  tx.objectStore(LESSON_STORE).put({
    id: lessonKey(subject, topic),
    subject,
    topic,
    payload,
    cachedAt: Date.now(),
    appVersion,
  } satisfies CachedLesson);
  await transactionDone(tx);
  db.close();
}

export async function getCachedTutorLesson(subject: string, topic: string, maxAgeMs = 30 * 24 * 60 * 60 * 1000): Promise<CachedLesson | null> {
  const db = await openOfflineDb();
  const tx = db.transaction(LESSON_STORE, "readonly");
  const row = (await requestResult(tx.objectStore(LESSON_STORE).get(lessonKey(subject, topic)))) as CachedLesson | undefined;
  await transactionDone(tx);
  db.close();
  if (!row || Date.now() - Number(row.cachedAt || 0) > maxAgeMs) return null;
  return row;
}

export async function listCachedTutorLessons(): Promise<CachedLesson[]> {
  const db = await openOfflineDb();
  const tx = db.transaction(LESSON_STORE, "readonly");
  const rows = (await requestResult(tx.objectStore(LESSON_STORE).getAll())) as CachedLesson[];
  await transactionDone(tx);
  db.close();
  return rows.sort((a, b) => b.cachedAt - a.cachedAt);
}

export async function queueSyncAction(url: string, body: Record<string, unknown>, options?: { dedupeKey?: string }) {
  const db = await openOfflineDb();
  const tx = db.transaction(ACTION_STORE, "readwrite");
  const store = tx.objectStore(ACTION_STORE);
  const dedupeKey = options?.dedupeKey;
  if (dedupeKey) {
    const all = (await requestResult(store.getAll())) as SyncAction[];
    for (const old of all.filter(item => item.dedupeKey === dedupeKey)) store.delete(old.id);
  }
  const action: SyncAction = {
    id: crypto.randomUUID(),
    url,
    method: "POST",
    body,
    queuedAt: Date.now(),
    attempts: 0,
    dedupeKey,
  };
  store.put(action);
  await transactionDone(tx);
  db.close();
  return action.id;
}

// Backwards-compatible alias used by older code paths.
export async function queueAttempt(payload: Record<string, unknown>) {
  return queueSyncAction("/api/tutor/progress", payload);
}

export async function countPendingSyncActions(): Promise<number> {
  const db = await openOfflineDb();
  const tx = db.transaction(ACTION_STORE, "readonly");
  const count = await requestResult(tx.objectStore(ACTION_STORE).count());
  await transactionDone(tx);
  db.close();
  return Number(count || 0);
}

export async function flushQueuedActions(): Promise<{ synced: number; remaining: number; blocked: boolean }> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { synced: 0, remaining: await countPendingSyncActions(), blocked: true };
  }
  const db = await openOfflineDb();
  const readTx = db.transaction(ACTION_STORE, "readonly");
  const actions = ((await requestResult(readTx.objectStore(ACTION_STORE).getAll())) as SyncAction[]).sort((a, b) => a.queuedAt - b.queuedAt);
  await transactionDone(readTx);
  let synced = 0;
  let blocked = false;
  for (const action of actions) {
    try {
      const response = await fetch(action.url, {
        method: action.method,
        headers: { "Content-Type": "application/json", "X-AVORA-Offline-Sync": "1" },
        credentials: "same-origin",
        body: JSON.stringify(action.body),
      });
      if (response.status === 401 || response.status === 403) { blocked = true; break; }
      if (!response.ok) continue;
      const tx = db.transaction(ACTION_STORE, "readwrite");
      tx.objectStore(ACTION_STORE).delete(action.id);
      await transactionDone(tx);
      synced += 1;
    } catch {
      break;
    }
  }
  db.close();
  return { synced, remaining: await countPendingSyncActions(), blocked };
}
