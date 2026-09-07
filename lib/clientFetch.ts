export async function readJson<T = any>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text.trim()) {
    throw new Error(response.ok
      ? 'AVORA received an empty response. Please retry.'
      : `AVORA could not complete this request (${response.status}). Please retry.`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error('AVORA received an invalid response. Please retry.');
  }
}
