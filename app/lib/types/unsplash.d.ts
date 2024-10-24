export type PhotoResponse = {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: Date;
  updated_at: Date;
  promoted_at: null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: string[];
  urls: Urls;
  links: WelcomeLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: null;
  topic_submissions?: WelcomeTopicSubmissions;
  asset_type: string;
  user: User;
  exif: Exif;
  location: Location;
  meta: Meta;
  public_domain: boolean;
  tags: Tag[];
  views: number;
  downloads: number;
  topics: string[];
};

export type AlternativeSlugs = {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
};

export type Exif = {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
};

export type WelcomeLinks = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

export type Location = {
  name: null;
  city: null;
  country: null;
  position: Position;
};

export type Position = {
  latitude: null;
  longitude: null;
};

export type Meta = {
  index: boolean;
};

export type Tag = {
  type: Type;
  title: string;
  source?: Source;
};

export type Source = {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
  affiliate_search_query: null;
};

export type Ancestry = {
  type: Category;
  category: Category;
  subcategory: Category;
};

export type Category = {
  slug: string;
  pretty_slug: string;
};

export type CoverPhoto = {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: WelcomeLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: null;
  topic_submissions: CoverPhotoTopicSubmissions;
  asset_type: string;
  premium: boolean;
  plus: boolean;
  user: User;
};

export type Breadcrumb = {
  slug: string;
  title: string;
  index: number;
  type: Type;
};

export enum Type {
  LandingPage = 'landing_page',
  Search = 'search',
}

export type CoverPhotoTopicSubmissions = {
  wallpapers?: Nature;
  nature?: Nature;
  'textures-patterns'?: TexturesPatterns;
};

export type Nature = {
  status: string;
};

export type TexturesPatterns = {
  status: string;
  approved_on: Date;
};

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

export type User = {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
};

export type UserLinks = {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
};

export type ProfileImage = {
  small: string;
  medium: string;
  large: string;
};

export type Social = {
  instagram_username: null | string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
};

export type WelcomeTopicSubmissions = {
  topic_submissions: {
    wallpapers: {
      status: string;
    };
    nature: {
      status: string;
    };
    'textures-patterns': {
      status: string;
      approved_on: string;
    };
  };
};
