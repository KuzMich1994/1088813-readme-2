import { Expose, Transform } from 'class-transformer';
import { Comment, PostType } from '@prisma/client';
import { PostState, Tag } from '@project/types';

export class PostRdo {
  @Expose()
  id: string;

  @Expose()
  title?: string;

  @Expose()
  type: PostType;

  @Expose()
  @Transform(({ value }) => value.map((tag: Tag) => tag.name))
  tags?: string;

  @Expose()
  description?: string;

  @Expose()
  quoteAuthor?: string;

  @Expose()
  quote?: string;

  @Expose()
  url?: string;

  @Expose()
  videoUrl?: string;

  @Expose()
  text?: string;

  @Expose()
  announcement?: string;

  @Expose()
  createdAt?: string;

  @Expose()
  updatedAt?: string;

  @Expose()
  photoUrl?: string;

  @Expose()
  authorId?: string;

  @Expose()
  state?: PostState;

  @Expose()
  @Transform(({ value }) =>
    value.map(({ text, updatedAt, createdAt, userId, id }: Comment) => ({
      id,
      userId,
      text,
      updatedAt,
      createdAt,
    }))
  )
  comments?: Comment[];

  @Expose()
  likes?: number;
}
