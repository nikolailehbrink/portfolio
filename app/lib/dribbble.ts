export type DribbbleShot = {
  id: number;
  title: string;
  description?: string;
  width: number;
  height: number;
  images: {
    hidpi?: string;
    normal: string;
    teaser: string;
    one_x?: string;
    two_x?: string;
    four_x?: string;
  };
  published_at: string;
  updated_at: string;
  html_url: string;
  animated: boolean;
  tags: string[];
  attachments: {
    id: number;
    url: string;
    thumbnail_url: string;
    size: number;
    content_type: string;
    created_at: string;
  }[];
  projects: {
    id: number;
    name: string;
    description: string;
    shots_count: number;
    created_at: string;
    updated_at: string;
  }[];
  team?: {
    id: number;
    name: string;
    login: string;
    html_url: string;
    avatar_url: string;
    bio: string;
    location: string;
    links: {
      web: string;
      twitter: string;
    };
    type: string;
    created_at: string;
    updated_at: string;
  };
  video?: {
    id: number;
    duration: number;
    video_file_name: string;
    video_file_size: number;
    width: number;
    height: number;
    silent: boolean;
    created_at: string;
    updated_at: string;
    url: string;
    small_preview_url: string;
    large_preview_url: string;
    xlarge_preview_url: string;
  };
  low_profile: boolean;
};

export async function getDribbbleShotsFromUser() {
  const response = await fetch(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = (await response.json()) as DribbbleShot[];
  const shots = data.map((shot) => ({
    id: shot.id,
    title: shot.title,
    height: shot.height,
    width: shot.width,
    html_url: shot.html_url,
    images: {
      two_x: shot.images.two_x,
      normal: shot.images.normal,
      hidpi: shot.images.hidpi,
    },
  }));
  return shots;
}
