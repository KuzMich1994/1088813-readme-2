import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { PostFilter } from './post.filter';
import { CreatePostDto } from './dto/create-post.dto';
import { TagEntity } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getPostById(id: string): Promise<PostEntity | null> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  public async find(filter?: PostFilter): Promise<PostEntity[]> {
    return await this.postRepository.find(filter);
  }

  public async createPost(
    dto: CreatePostDto,
    tags: TagEntity[] = []
  ): Promise<PostEntity> {
    const postEntity = PostEntity.fromDto(dto, tags);
    return await this.postRepository.save(postEntity);
  }
}
