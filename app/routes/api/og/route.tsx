import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import interLatin400 from "./inter-latin-400-normal.ttf";
import interLatin700 from "./inter-latin-700-normal.ttf";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const [interLatin400Data, interLatin700Data] = await Promise.all([
    fetch(new URL(interLatin400, request.url)).then((res) => res.arrayBuffer()),
    fetch(new URL(interLatin700, request.url)).then((res) => res.arrayBuffer()),
  ]);
  const jsx = (
    <div tw="flex flex-col w-full h-full items-center justify-end bg-neutral-900">
      <div tw="flex flex-col tracking-tight w-full p-12 pb-10">
        <span
          style={{ lineHeight: 1.15 }}
          tw="text-neutral-100 text-5xl font-bold mb-4 max-w-2xl"
        >
          Make your button look like an actual button
        </span>
        <span
          style={{ lineHeight: 1.25 }}
          tw="font-normal max-w-4xl text-2xl text-neutral-400 leading-normal"
        >
          A simple guide to creating buttons that feel interactive, using
          nothing but modern CSS techniques inspired by real-world materials and
          lighting.
        </span>
      </div>
    </div>
  );
  // From satori docs example
  const svg = await satori(jsx, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: interLatin400Data,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: interLatin700Data,
        weight: 700,
        style: "normal",
      },
    ],
  });
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const data = pngData.asPng();
  return new Response(data, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
