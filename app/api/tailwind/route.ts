import tailwindConfig from "@/tailwind.config";

export function GET() {
  return Response.json(tailwindConfig);
}
