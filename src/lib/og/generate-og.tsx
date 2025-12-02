/* eslint-disable react/no-unknown-property */

import { ImageResponse } from "@vercel/og";
import InterLatin400 from "./inter-latin-400-normal.ttf?arraybuffer";
import InterLatin700 from "./inter-latin-700-normal.ttf?arraybuffer";

type Props = {
  title: string;
  description: string;
  origin: string;
};

export function generateOG({ title, description, origin }: Props) {
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
          name: "Inter",
          data: InterLatin400,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: InterLatin700,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
