import { failure, success, type ApiResult } from "@/lib/api-schema";

function isApiResult<T>(value: unknown): value is ApiResult<T> {
  if (typeof value !== "object" || value === null || !("ok" in value)) {
    return false;
  }

  const candidate = value as { ok?: unknown };
  return typeof candidate.ok === "boolean";
}

function toFailureResult<TResponse>(
  data: ApiResult<TResponse> | TResponse | { error?: string; message?: string }
) {
  if (isApiResult<TResponse>(data) && !data.ok) {
    return data;
  }

  const message =
    typeof data === "object" && data && "message" in data && typeof data.message === "string"
      ? data.message
      : typeof data === "object" && data && "error" in data && typeof data.error === "string"
        ? data.error
        : "Request failed.";

  return failure("request_failed", message, data);
}

export async function postJson<TResponse, TBody>(
  url: string,
  body: TBody,
  init?: RequestInit
): Promise<ApiResult<TResponse>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      body: JSON.stringify(body),
      ...init,
    });

    const data = (await response.json()) as
      | ApiResult<TResponse>
      | TResponse
      | { error?: string; message?: string };
    if (!response.ok) {
      return toFailureResult(data);
    }

    if (isApiResult<TResponse>(data)) {
      return data;
    }

    return success(data as TResponse);
  } catch (error) {
    return failure(
      "network_error",
      error instanceof Error ? error.message : "Network request failed.",
      error
    );
  }
}

export async function getJson<TResponse>(url: string, init?: RequestInit): Promise<ApiResult<TResponse>> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...(init?.headers ?? {}),
      },
      ...init,
    });

    const data = (await response.json()) as
      | ApiResult<TResponse>
      | TResponse
      | { error?: string; message?: string };

    if (!response.ok) {
      return toFailureResult(data);
    }

    if (isApiResult<TResponse>(data)) {
      return data;
    }

    return success(data as TResponse);
  } catch (error) {
    return failure(
      "network_error",
      error instanceof Error ? error.message : "Network request failed.",
      error
    );
  }
}
