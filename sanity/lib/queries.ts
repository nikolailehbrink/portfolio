import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;

export const SERVICES_QUERY = groq`*[_type == "service" && defined(slug)]`;

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)]`;

export const EXPERIENCES_QUERY = groq`*[_type == "experience"]`;
