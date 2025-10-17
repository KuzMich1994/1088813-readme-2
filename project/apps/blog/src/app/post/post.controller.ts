import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { fillDto } from '@project/helpers';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  public async findPosts(@Query('title') title: string) {
    const postsEntities = await this.postService.find({ title });
    const posts = postsEntities.map((post) => post.toPOJO());
    return fillDto(PostRdo, posts);
  }

  @Post('/create')
  public async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postService.createPost(post);

    return fillDto(PostRdo, newPost.toPOJO());
  }

  @Get('/:id')
  public async getPostById(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);
    return fillDto(PostRdo, post?.toPOJO());
  }
}
