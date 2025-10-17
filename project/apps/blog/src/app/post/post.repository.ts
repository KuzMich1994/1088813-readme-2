import { BasePostgresRepository } from '@project/core';
import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { Post } from '@project/types';
import { PrismaClientService } from '@project/models';
import { flatPost } from '@project/helpers';
import { POST_INCLUDES } from './post.constant';
import { PostFilter, postFilterToPrismaFilter } from './post.filter';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(override readonly client: PrismaClientService) {
    super(client, PostEntity.fromObject);
  }

  override async save(entity: PostEntity): Promise<PostEntity> {
    const pojo = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        type: pojo.type,
        state: pojo.state,
        authorId: pojo.authorId,
        tags: {
          connect: pojo.tags?.map(({ id }) => ({ id })),
        },
      },
    });

    entity.id = record.id;

    return entity;
  }

  override async findById(id: PostEntity['id']): Promise<PostEntity | null> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: POST_INCLUDES,
    });

    if (!document) {
      return null;
    }

    const flattenPost = flatPost(document);

    return this.createEntityFromDocument(flattenPost as unknown as PostEntity);
  }

  public async find(filter?: PostFilter): Promise<PostEntity[]> {
    const where = postFilterToPrismaFilter(filter);

    const results = await this.client.post.findMany({
      where,
      take: 25,
      include: POST_INCLUDES,
      orderBy: [{ likes: { _count: 'desc' } }, { createdAt: 'desc' }],
    });

    return results
      .map((result) =>
        this.createEntityFromDocument(flatPost(result) as unknown as PostEntity)
      )
      .filter((result) => result !== null);
  }

  override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }
}
