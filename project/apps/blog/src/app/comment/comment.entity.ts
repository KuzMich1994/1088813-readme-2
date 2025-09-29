import { Entity } from '@project/core';
import { Comment } from '@project/types';

export class CommentEntity implements Comment, Entity<string> {
  id?: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  userId: string;

  constructor(data: Comment) {
    if (!data.text) {
      throw new Error('Comment text is required');
    }

    this.populate(data);
  }

  public populate(data: Comment): void {
    this.id = data.id;
    this.text = data.text;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.postId = data.postId;
    this.userId = data.userId;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
