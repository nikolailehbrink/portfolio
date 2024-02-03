import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]{
  ...,
  mainImage{
    asset->{
      _id,
      metadata{
          lqip
      }
    }
  }, 
  author->{
    name,
    slug,
    image{
      asset->{
        _id,
        metadata{
          lqip
        }
      },
      alt
    },
    bio
  },
  categories[]->{
    _id,
    title,
    description,
  },
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    ...,
    mainImage{
      asset->{
        _id,
        metadata{
            lqip
        }
      }
    }, 
    body[]{
      ...,
      _type == 'image' => {
        ...,
        asset->{
          _id,
          metadata {
            lqip
          }
        }
      }
    },
    author->{
      name,
      slug,
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      bio
    },
    categories[]->{
      _id,
      title,
      description,
    },
    "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  }`;

export const SERVICES_QUERY = groq`*[_type == "service" && defined(slug)]|order(orderRank)`;

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)]|order(orderRank)`;

export const EXPERIENCES_QUERY = groq`*[_type == "experience"]`;
