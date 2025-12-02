import { generateOG } from "@/lib/og/generate-og";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import type { GetStaticPaths } from "astro";
import { getPosts } from "@/lib/posts";

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props, url }) => {
  const { title, description } = props;
  const { origin } = url;
  return generateOG({ title, description, origin });
};

export const getStaticPaths = (async () => {
  const posts = (await getPosts()).filter((post) => !post.data.cover);
  return posts.map(({ id, data: { title, description } }) => ({
    params: {
      slug: id,
    },
    props: {
      title,
      description,
    },
  }));
}) satisfies GetStaticPaths;
