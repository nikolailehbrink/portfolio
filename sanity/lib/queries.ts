import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage{
        ...,
        'lqip': asset->metadata.lqip,
      },
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage{
      ...,
      'lqip': asset->metadata.lqip,
    },
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    coverImage{
      ...,
      'lqip': asset->metadata.lqip,
    },
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
    body,
    publishedAt,
    author,
  }
`;

export const postsQuery = groq`
{
  "blog": *[_type == "blog"][0]{
    _id,
    overview,
    title,
  },
  "posts": *[_type == "post" && defined(slug)]{
    ...,
    "slug": slug.current,
    coverImage{
      ...,
      'lqip': asset->metadata.lqip,
    },
    author->{
      name,
      "slug": slug.current,
      image{
        ...,
        'lqip': asset->metadata.lqip,
      },
      bio
    },
    tags,
  } | order(_createdAt desc)
}`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`;
