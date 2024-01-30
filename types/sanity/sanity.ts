export type Slug = {
  _type: "slug";
  current: string;
};

export type Image = {
  _type: "image";
  alt?: string;
  asset: Reference & {
    metadata: {
      lqip: string;
    };
  };
};

export type Reference = {
  _ref: string;
  _type: string;
};
