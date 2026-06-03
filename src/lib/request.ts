import type { z } from "astro/zod";

// Parse and validate a JSON request body. Returns either the typed data or a
// ready-to-send 400 response, so endpoints can guard with a single check.
export async function parseJsonRequest<S extends z.ZodTypeAny>(
  request: Request,
  schema: S,
): Promise<
  | { data: z.infer<S>; response?: undefined }
  | { data?: undefined; response: Response }
> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { response: new Response("Invalid JSON body", { status: 400 }) };
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return { response: new Response("Invalid request body", { status: 400 }) };
  }

  return { data: parsed.data };
}
