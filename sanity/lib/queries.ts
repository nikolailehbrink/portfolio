import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

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
  }`;

export const SERVICES_QUERY = groq`*[_type == "service" && defined(slug)]`;

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)]`;

export const EXPERIENCES_QUERY = groq`*[_type == "experience"]`;
