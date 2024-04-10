import { groq } from "next-sanity";

export const homePageQuery = groq`
{
  "home": *[_type == "home"][0]{
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
      site,
      title,
    },
    title,
  },
  "projects": *[_type == "project" && defined(slug)]{
    _type,
    _id,
    overview,
    tags,
    site,
    title,
    orderRank,
    "slug": slug.current,
    coverImage{
      ...,
      'lqip': asset->metadata.lqip,
    },
    tags,
  }|order(orderRank),
  "services": *[_type == "service" && defined(slug)]{
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    orderRank,
    image{
      ...,
      'lqip': asset->metadata.lqip,
    },
  }|order(orderRank),
  "experiences": *[_type == "experience"]{
    _id,
    _type,
    title,
    duration,
    description,
    orderRank,
    company{
      name,
      url,
      logo{
        ...,
        'lqip': asset->metadata.lqip,
      }
    }
  }|order(orderRank)
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

export const chatBySlugQuery = groq`*[_type == "chat" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  logo{
    ...,
    'lqip': asset->metadata.lqip,
  }
}`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
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
      bio, 
      url,
    },
    "slug": slug.current,
    body[]{
      ...,
      _type == 'image' => {
        ...,
        'lqip': asset->metadata.lqip,
      },
    },
    "headings": body[length(style) == 2 && string::startsWith(style, "h")],
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
