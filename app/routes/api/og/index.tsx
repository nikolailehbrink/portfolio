/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";

import type { Route } from "./+types";

import InterLatin400 from "./inter-latin-400-normal.ttf?arraybuffer";
import InterLatin700 from "./inter-latin-700-normal.ttf?arraybuffer";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const { origin, searchParams } = new URL(request.url);
    const title = searchParams.get("title")?.trim().slice(0, 70);
    const description = searchParams.get("description")?.trim().slice(0, 200);

    if (!title || !description) {
      return new Response("Missing title or description", {
        headers: {
          "Content-Type": "text/plain",
        },
        status: 400,
      });
    }

    return new ImageResponse(
      (
        <div tw="flex h-full w-full flex-col justify-end bg-neutral-900 text-neutral-100">
          <span tw="absolute top-10 left-12 text-3xl text-neutral-400">
            {origin}
          </span>
          <div tw="flex w-full flex-col p-12 pb-10">
            <span
              style={{ lineHeight: 1.15 }}
              tw="mb-4 max-w-2xl text-6xl font-bold"
            >
              {title}
            </span>
            <span
              style={{ lineHeight: 1.35 }}
              tw="max-w-4xl text-3xl leading-normal font-normal text-neutral-400"
            >
              {description}
            </span>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            data: InterLatin400,
            name: "Inter",
            style: "normal",
            weight: 400,
          },
          {
            data: InterLatin700,
            name: "Inter",
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (error) {
    console.error("OG Image generation error:", error);
    return new Response("Internal server error", {
      headers: {
        "Content-Type": "text/plain",
      },
      status: 500,
    });
  }
}
