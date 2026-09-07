const DB_NAME = "avora-offline";
const STORE = "pending-attempts";

export function openOfflineDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function queueAttempt(payload: Record<string, unknown>) {
  const db = await openOfflineDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put({ id: crypto.randomUUID(), ...payload, queuedAt: Date.now() });
}
