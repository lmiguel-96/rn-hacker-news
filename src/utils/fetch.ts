import { HACKER_NEWS_API } from "./constants"

export const fetchWith = async <T = any>(
  endpoint: string,
  data?: unknown,
  method = 'GET',
  headers?: { [s: string]: any },
  signal?: AbortSignal
): Promise<T> => {
  const url = `${HACKER_NEWS_API}${endpoint}`
  const response = await fetch(url, {
    method,
    headers,
    ...(!!data && { body: JSON.stringify(data) }),
    signal
  })
  return await response.json()
}
