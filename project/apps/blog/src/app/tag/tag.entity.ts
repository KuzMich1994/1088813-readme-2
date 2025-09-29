import { Tag } from '@project/types';
import { Entity } from '@project/core';

export class TagEntity implements Tag, Entity<string> {
  id?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Tag) {
    if (!data.name) {
      throw new Error('Tag name is required');
    }

    this.populate(data);
  }

  public populate(data: Tag) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
