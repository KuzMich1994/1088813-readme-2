import { PrismaClient, PostState, PostType } from '@prisma/client';
import * as Faker from '@faker-js/faker';

const faker = Faker.faker;

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function createRandomTag() {
  return {
    id: faker.string.uuid(),
    name: faker.word.noun({ length: { min: 3, max: 10 } }),
  };
}

function getTags() {
  return Array.from({ length: 10 }, () => createRandomTag());
}
const generatedTags = getTags();

function createRandomVideoPost() {
  return {
    id: faker.string.uuid(),
    authorId: FIRST_USER_ID,
    type: 'video' as PostType,
    state: 'published' as PostState,
    tags: {
      connect: [{ id: generatedTags[1].id }, { id: generatedTags[2].id }],
    },
    videoPost: {
      create: {
        title: faker.lorem.sentence({ min: 20, max: 50 }),
        videoUrl: faker.image.url(),
      },
    },
  };
}

function createRandomTextPost() {
  return {
    id: faker.string.uuid(),
    authorId: SECOND_USER_ID,
    type: 'text' as PostType,
    state: 'published' as PostState,
    tags: {
      connect: [{ id: generatedTags[0].id }, { id: generatedTags[3].id }],
    },
    textPost: {
      create: {
        title: faker.lorem.sentence({ min: 20, max: 50 }),
        announcement: faker.lorem.paragraphs({ min: 1, max: 5 }),
        text: faker.lorem.paragraphs({ min: 2, max: 10 }),
      },
    },
  };
}

function createRandomPhotoPost() {
  return {
    id: faker.string.uuid(),
    authorId: FIRST_USER_ID,
    type: 'photo' as PostType,
    state: 'published' as PostState,
    tags: {
      connect: [{ id: generatedTags[4].id }, { id: generatedTags[9].id }],
    },
    photoPost: {
      create: {
        photoUrl: faker.image.url(),
      },
    },
  };
}

function createRandomQuotePost() {
  return {
    id: faker.string.uuid(),
    authorId: SECOND_USER_ID,
    type: 'quote' as PostType,
    state: 'published' as PostState,
    tags: {
      connect: [{ id: generatedTags[6].id }, { id: generatedTags[8].id }],
    },
    quotePost: {
      create: {
        quote: faker.lorem.paragraph({ min: 20, max: 300 }),
        quoteAuthor: `${faker.person.firstName()} ${faker.person.lastName()}`,
      },
    },
  };
}

function createRandomLinkPost() {
  return {
    id: faker.string.uuid(),
    authorId: SECOND_USER_ID,
    type: 'link' as PostType,
    state: 'published' as PostState,
    tags: {
      connect: [{ id: generatedTags[6].id }, { id: generatedTags[8].id }],
    },
    linkPost: {
      create: {
        url: faker.image.url(),
        description: faker.lorem.paragraphs({ max: 5, min: 0 }),
      },
    },
  };
}

function getRandomTextPosts() {
  return Array.from({ length: 10 }, () => createRandomTextPost());
}

function getRandomVideoPosts() {
  return Array.from({ length: 10 }, () => createRandomVideoPost());
}

function getRandomQuotePosts() {
  return Array.from({ length: 10 }, () => createRandomQuotePost());
}

function getRandomPhotoPosts() {
  return Array.from({ length: 10 }, () => createRandomPhotoPost());
}

function getRandomLinkPosts() {
  return Array.from({ length: 10 }, () => createRandomLinkPost());
}

const textPosts = getRandomTextPosts();
const videoPosts = getRandomVideoPosts();
const quotePosts = getRandomQuotePosts();
const photoPosts = getRandomPhotoPosts();
const linkPosts = getRandomLinkPosts();

function createRandomComment() {
  const randomPost = faker.helpers.arrayElement(videoPosts);
  return {
    userId: FIRST_USER_ID,
    postId: randomPost.id,
    text: faker.lorem.paragraphs({ min: 1, max: 5 }),
  };
}

function getRandomComments() {
  return Array.from({ length: 10 }, () => createRandomComment());
}

const comments = getRandomComments();

function createRandomLike() {
  const randomPost = faker.helpers.arrayElement(videoPosts);

  return {
    userId: FIRST_USER_ID,
    postId: randomPost.id,
  };
}

function getLikes() {
  return Array.from({ length: 10 }, () => createRandomLike());
}

const likes = getLikes();

async function seedDb(prismaClient: PrismaClient) {
  for (const tag of generatedTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        name: tag.name,
      },
    });
  }

  for (const post of textPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        authorId: post.authorId,
        type: post.type,
        state: post.state,
        tags: post.tags,
        textPost: post.textPost,
      },
    });
  }

  for (const post of videoPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        authorId: post.authorId,
        type: post.type,
        state: post.state,
        tags: post.tags,
        videoPost: post.videoPost,
      },
    });
  }

  for (const post of quotePosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        authorId: post.authorId,
        type: post.type,
        state: post.state,
        tags: post.tags,
        quotePost: post.quotePost,
      },
    });
  }

  for (const post of photoPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        authorId: post.authorId,
        type: post.type,
        state: post.state,
        tags: post.tags,
        photoPost: post.photoPost,
      },
    });
  }

  for (const post of linkPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        authorId: post.authorId,
        type: post.type,
        state: post.state,
        tags: post.tags,
        linkPost: post.linkPost,
      },
    });
  }

  for (const comment of comments) {
    await prismaClient.comment.create({
      data: {
        text: comment.text,
        userId: comment.userId,
        postId: comment.postId,
      },
    });
  }

  for (const like of likes) {
    await prismaClient.like.upsert({
      where: {
        userId_postId: { userId: like.userId, postId: like.postId },
      },
      update: {},
      create: like,
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
