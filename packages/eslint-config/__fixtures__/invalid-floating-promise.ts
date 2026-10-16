// Floating promise — the returned Promise is not awaited or returned.
async function asyncTask(): Promise<string> {
  return "done";
}

export function fireAndForget(): void {
  asyncTask(); // no-floating-promises
}
