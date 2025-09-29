import { Tag } from './tag.interface';

export enum PostType {
  Text = 'text',
  Video = 'video',
  Quote = 'quote',
  Photo = 'photo',
  Link = 'link',
}

export enum PostState {
  Published = 'published',
  Draft = 'draft',
}

export interface BasePost {
  id?: string;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
  state: PostState;
  originalPostId?: string;
  originalAuthorId?: string;
  repostCreatedAt?: Date;
  authorId: string;
}

export interface TextPost extends BasePost {
  title: string;
  text: string;
  announcement: string;
  type: PostType.Text;
}

export interface VideoPost extends BasePost {
  title: string;
  videoUrl: string;
  type: PostType.Video;
}

export interface QuotePost extends BasePost {
  quote: string;
  quoteAuthor: string;
  type: PostType.Quote;
}

export interface PhotoPost extends BasePost {
  photoUrl: string;
  type: PostType.Photo;
}

export interface LinkPost extends BasePost {
  url: string;
  description: string;
  type: PostType.Link;
}

export type Post = TextPost | VideoPost | QuotePost | PhotoPost | LinkPost;
