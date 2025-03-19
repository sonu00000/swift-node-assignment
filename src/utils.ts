export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`)
  }
  return response.json() as Promise<T>
}
