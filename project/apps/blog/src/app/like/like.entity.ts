import { Like } from '@project/types';
import { Entity } from '@project/core';

export class LikeEntity implements Like, Entity<string> {
  id?: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Like) {
    this.populate(data);
  }

  public populate(data: Like) {
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.postId = data.postId;
    this.userId = data.userId;
    this.id = data.id;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
