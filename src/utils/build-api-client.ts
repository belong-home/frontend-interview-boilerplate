export class ApiError extends Error {
  status: number | undefined;
  code: string | undefined;

  constructor(
    message: string,
    code: string | undefined,
    status: number | undefined,
  ) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function isJsonString(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * The one thing this fetcher deliberately does NOT do is accept or forward an
 * `AbortSignal` — same as the real client it mirrors. Cancellation, if you
 * need it here, has to be handled at whatever calls this (e.g. by ignoring a
 * stale response rather than aborting the network request).
 */
export function fetcher<T>(
  endpoint: string,
  config: RequestInit = {},
): Promise<T> {
  return fetch(endpoint, config).then(async (response) => {
    const responseText = await response.text();

    if (response.ok) {
      return (
        responseText
          ? isJsonString(responseText)
            ? JSON.parse(responseText)
            : responseText
          : {}
      ) as T;
    }

    let message = 'Something went wrong.';
    let code: string | undefined;

    if (responseText && isJsonString(responseText)) {
      const parsed = JSON.parse(responseText);
      message = parsed?.message ?? message;
      code = parsed?.code;
    }

    throw new ApiError(message, code, response.status);
  });
}

export type BaseClient<T = unknown> = (
  endpoint: string,
  config?: RequestInit,
) => Promise<T>;

export function buildApiClientHelpers(baseClient: BaseClient) {
  return {
    get<T>(endpoint: string, config: RequestInit = {}): Promise<T> {
      return baseClient(endpoint, { ...config, method: 'GET' }) as Promise<T>;
    },
  };
}
