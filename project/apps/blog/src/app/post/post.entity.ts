import { Entity } from '@project/core';
import { BasePost, Post, PostType } from '@project/types';
import { CommentEntity } from '../comment/comment.entity';
import { TagEntity } from '../tag/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';

export class PostEntity<T extends Post = Post> implements Entity<string, Post> {
  id?: T['id'];
  tags: T['tags'];
  authorId: T['authorId'];
  originalPostId?: T['originalPostId'];
  createdAt: T['createdAt'];
  updatedAt: T['updatedAt'];
  repostCreatedAt?: T['repostCreatedAt'];
  originalAuthorId?: T['originalAuthorId'];
  state: T['state'];
  type: T['type'];
  title: string;
  announcement: string;
  text: string;
  videoUrl: string;
  quote: string;
  quoteAuthor: string;
  photoUrl: string;
  url: string;
  description: string;
  comments: T['comments'];
  likes: T['likes'];

  public populate(data: Post): PostEntity {
    this.id = data.id;
    this.tags = data.tags?.map((tag) => TagEntity.fromObject(tag));
    this.authorId = data.authorId;
    this.originalPostId = data.originalPostId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.type = data.type;
    this.comments = data.comments?.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.likes = data.likes;
    switch (data.type) {
      case PostType.Text: {
        this.title = data.title;
        this.announcement = data.announcement;
        this.text = data.text;
        break;
      }
      case PostType.Video: {
        this.title = data.title;
        this.videoUrl = data.videoUrl;
        break;
      }
      case PostType.Quote: {
        this.quote = data.quote;
        this.quoteAuthor = data.quoteAuthor;
        break;
      }
      case PostType.Photo: {
        this.photoUrl = data.photoUrl;
        break;
      }
      case PostType.Link: {
        this.url = data.url;
        this.description = data.description;
      }
    }

    return this;
  }

  toPOJO(): Post {
    const basePost: BasePost = {
      id: this.id,
      tags: this.tags,
      authorId: this.authorId,
      originalPostId: this.originalPostId,
      createdAt: this.createdAt,
      originalAuthorId: this.originalAuthorId,
      repostCreatedAt: this.repostCreatedAt,
      state: this.state,
      updatedAt: this.updatedAt,
      comments: this.comments,
      likes: this.likes,
    };
    switch (this.type) {
      case PostType.Text: {
        return {
          ...basePost,
          title: this.title,
          announcement: this.announcement,
          text: this.text,
          type: PostType.Text,
        };
      }
      case PostType.Video: {
        return {
          ...basePost,
          title: this.title,
          videoUrl: this.videoUrl,
          type: PostType.Video,
        };
      }
      case PostType.Quote: {
        return {
          ...basePost,
          quote: this.quote,
          quoteAuthor: this.quoteAuthor,
          type: PostType.Quote,
        };
      }
      case PostType.Photo: {
        return {
          ...basePost,
          photoUrl: this.photoUrl,
          type: PostType.Photo,
        };
      }
      case PostType.Link: {
        return {
          ...basePost,
          url: this.url,
          description: this.description,
          type: PostType.Link,
        };
      }
    }
  }

  static fromObject(data: Post): PostEntity {
    return new PostEntity().populate(data);
  }

  static fromDto(dto: CreatePostDto): PostEntity {
    const entity = new PostEntity();
    entity.url = dto.url;
    entity.text = dto.text;
    entity.announcement = dto.announcement;
    entity.type = dto.type;
    entity.title = dto.title;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.quote = dto.quote;
    entity.videoUrl = dto.videoUrl;
    entity.photoUrl = dto.photoUrl;
    entity.description = dto.description;

    return entity;
  }
}
