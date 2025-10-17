import { PostState, PostType } from '@project/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post tags',
    example: '[tag1, tag2]',
  })
  tags?: string[];

  @ApiProperty({
    description: 'Post state',
    example: 'published',
  })
  state: PostState;

  @ApiProperty({
    description: 'Post type',
    example: 'video',
  })
  type: PostType;

  @ApiProperty({
    description: 'The title of the post',
    example: 'Post 1',
  })
  title: string;

  @ApiProperty({
    description: 'Post text with type text',
    example: 'jqwgrhhkjqwgr',
  })
  text: string;

  @ApiProperty({
    description: 'Post announcement with type text',
    example: 'jqwgrhhkjqwgr',
  })
  announcement: string;

  @ApiProperty({
    description: 'Post videoUrl with type video',
    example: 'https://www.youtube.com/',
  })
  videoUrl: string;

  @ApiProperty({
    description: 'Post quote with type quote',
    example: 'asjfhqjkw',
  })
  quote: string;

  @ApiProperty({
    description: 'Post quote author with type quote',
    example: 'asjfhqjkw',
  })
  quoteAuthor: string;

  @ApiProperty({
    description: 'Post photo with type photo',
    example: 'https://www.somePhoto.com/',
  })
  photoUrl: string;

  @ApiProperty({
    description: 'Post url with type link',
    example: 'https://www.someUrl.com/',
  })
  url: string;

  @ApiProperty({
    description: 'Post description with type link',
    example: 'asdastf',
  })
  description: string;
}
