declare module "*.svg?url" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
