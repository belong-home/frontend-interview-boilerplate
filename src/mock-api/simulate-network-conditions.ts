const MIN_LATENCY_MS = 300;
const MAX_LATENCY_MS = 1200;
const ERROR_RATE = 1 / 6;

export async function simulateNetworkConditions(): Promise<{
  shouldError: boolean;
}> {
  const delay =
    MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return { shouldError: Math.random() < ERROR_RATE };
}
