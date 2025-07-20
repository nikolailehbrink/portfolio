import { ImageResponse } from "@vercel/og";
import type { Route } from "./+types/og";
import interLatin400 from "./inter-latin-400-normal.ttf";
import interLatin700 from "./inter-latin-700-normal.ttf";

export async function loader({ request }: Route.LoaderArgs) {
  const [interLatin400Data, interLatin700Data] = await Promise.all([
    fetch(new URL(interLatin400, request.url)).then((res) => res.arrayBuffer()),
    fetch(new URL(interLatin700, request.url)).then((res) => res.arrayBuffer()),
  ]);
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title")?.slice(0, 100) ?? "Beispiel-Titel";
    const description =
      searchParams.get("description")?.slice(0, 200) ??
      "Dies ist eine Beispielbeschreibung für die Open Graph-Bildgenerierung.";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            fontFamily: "Inter", // 👈 Add this
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <img
              alt="Vercel"
              height={200}
              src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
              style={{ margin: "0 30px" }}
              width={232}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Inter",
            data: interLatin400Data,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: interLatin700Data,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (e: unknown) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
