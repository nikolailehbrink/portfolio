import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });

export async function GET() {
  const gists = await octokit.request("GET /gists", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return Response.json(gists.data);
}
