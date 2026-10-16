// Valid TypeScript — passes both base and type-checked configs.
export function add(a: number, b: number): number {
  return a + b;
}

export async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  return res.json();
}
