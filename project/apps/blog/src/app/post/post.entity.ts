import { Entity } from '@project/core';
import { BasePost, Post, PostType } from '@project/types';

export class PostEntity<T extends Post = Post> implements Entity<string> {
  constructor(private readonly post: T) {}
  toPOJO(): Record<string, unknown> {
    const basePost: BasePost = {
      id: this.post.id,
      tags: this.post.tags,
      authorId: this.post.authorId,
      originalPostId: this.post.originalPostId,
      createdAt: this.post.createdAt,
      originalAuthorId: this.post.originalAuthorId,
      repostCreatedAt: this.post.repostCreatedAt,
      state: this.post.state,
      updatedAt: this.post.updatedAt,
    };
    switch (this.post.type) {
      case PostType.Text: {
        return {
          ...basePost,
          title: this.post.title,
          announcement: this.post.announcement,
          text: this.post.text,
          type: PostType.Text,
        };
      }
      case PostType.Video: {
        return {
          ...basePost,
          title: this.post.title,
          videoUrl: this.post.videoUrl,
          type: PostType.Video,
        };
      }
      case PostType.Quote: {
        return {
          ...basePost,
          quote: this.post.quote,
          quoteAuthor: this.post.quoteAuthor,
          type: PostType.Quote,
        };
      }
      case PostType.Photo: {
        return {
          ...basePost,
          photoUrl: this.post.photoUrl,
          type: PostType.Photo,
        };
      }
      case PostType.Link: {
        return {
          ...basePost,
          url: this.post.url,
          description: this.post.description,
          type: PostType.Link,
        };
      }
      default: {
        return {
          ...basePost,
        };
      }
    }
  }
}
