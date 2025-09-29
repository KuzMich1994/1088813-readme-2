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
        announcement: faker.lorem.paragraphs({ min: 50, max: 255 }),
        text: faker.lorem.paragraphs({ min: 100, max: 1024 }),
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
    type: 'quote' as PostType,
    state: 'published' as PostState,
    tags: {
      connect: [{ id: generatedTags[6].id }, { id: generatedTags[8].id }],
    },
    linkPost: {
      create: {
        url: faker.image.url(),
        description: faker.lorem.paragraphs({ max: 300, min: 0 }),
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
  return {
    userId: FIRST_USER_ID,
    postId: textPosts[0].id,
    text: faker.lorem.paragraphs({ min: 10, max: 300 }),
  };
}

function getRandomComments() {
  return Array.from({ length: 10 }, () => createRandomComment());
}

const comments = getRandomComments();

function getLikes() {
  return Array.from({ length: 10 }, (_, index) => ({
    userId: FIRST_USER_ID,
    postId: textPosts[index].id,
  }));
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
    await prismaClient.like.create({
      data: {
        userId: like.userId,
        postId: like.postId,
      },
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

// const FIRST_TAG_UUID = '77646648-c595-4e49-89f0-fabfdd311010';
// const SECOND_TAG_UUID = 'f7c13f14-e2de-4958-be55-1918f0a86c1f';
//
// const FIRST_POST_UUID = 'b182f2f1-740f-4d6e-a304-e9a159f236e6';
// const SECOND_POST_UUID = '290c23ed-5c50-42d9-a258-aa30ffd58f36';
// const THIRD_POST_UUID = 'd956e310-2e54-43bc-b92e-703031c2b659';
// const FOURTH_POST_UUID = 'd47c83b3-51f0-4b0a-9f6a-6201d8f3a57c';
// const FIFTH_POST_UUID = '72c7aa70-c2c1-43ec-8662-56be13d9d19a';
// const SIXTH_POST_UUID = '46ed8856-bb03-4344-bbef-2cb0cc59aa24';
//
// const FIRST_USER_ID = '686d211ea0db1cee2faab282';
// const SECOND_USER_ID = '686d22155a6bfd4bd6a24947';
//
// function getTags() {
//   return [
//     { id: FIRST_TAG_UUID, name: 'знаменитость' },
//     { id: SECOND_TAG_UUID, name: 'достопримечательность' },
//   ];
// }
//
// function getTextPosts() {
//   return [
//     {
//       id: FIRST_POST_UUID,
//       authorId: FIRST_USER_ID,
//       type: 'text' as PostType,
//       state: 'published' as PostState,
//       tags: {
//         connect: [{ id: FIRST_TAG_UUID }, { id: SECOND_TAG_UUID }],
//       },
//       textPost: {
//         create: {
//           title: `Руководство по современной веб-разработке`,
//           announcement: `Краткое введение в основы веб-разработки. В этой статье мы рассмотрим ключевые концепции и инструменты современного веб-программирования, которые должен знать каждый разработчик.`,
//           text: `Подробное содержание статьи. В современном мире веб-разработки существует множество инструментов и технологий. JavaScript остается основным языком фронтенда, а фреймворки как React, Vue и Angular упрощают создание интерактивных пользовательских интерфейсов. Серверная часть может быть реализована на Node.js, Python, Java или других языках. Базы данных, как реляционные (PostgreSQL, MySQL), так и NoSQL (MongoDB, Redis), играют важную роль в хранении данных. DevOps практики с использованием Docker, Kubernetes и CI/CD пайплайнов помогают автоматизировать процесс разработки и деплоя приложений.`,
//         },
//       },
//     },
//     {
//       id: SECOND_POST_UUID,
//       authorId: SECOND_USER_ID,
//       type: 'text' as PostType,
//       state: 'published' as PostState,
//       tags: {
//         connect: [{ id: SECOND_TAG_UUID }],
//       },
//       textPost: {
//         create: {
//           title: `Руководство по современной веб-разработке`,
//           announcement: `Краткое введение в основы веб-разработки. В этой статье мы рассмотрим ключевые концепции и инструменты современного веб-программирования, которые должен знать каждый разработчик.`,
//           text: `Подробное содержание статьи. В современном мире веб-разработки существует множество инструментов и технологий. JavaScript остается основным языком фронтенда, а фреймворки как React, Vue и Angular упрощают создание интерактивных пользовательских интерфейсов. Серверная часть может быть реализована на Node.js, Python, Java или других языках. Базы данных, как реляционные (PostgreSQL, MySQL), так и NoSQL (MongoDB, Redis), играют важную роль в хранении данных. DevOps практики с использованием Docker, Kubernetes и CI/CD пайплайнов помогают автоматизировать процесс разработки и деплоя приложений.`,
//         },
//       },
//     },
//   ];
// }
//
// function getVideoPosts() {
//   return [
//     {
//       id: THIRD_POST_UUID,
//       authorId: FIRST_USER_ID,
//       type: 'video' as PostType,
//       state: 'published' as PostState,
//       tags: {
//         connect: [{ id: SECOND_TAG_UUID }],
//       },
//       videoPost: {
//         create: {
//           title: 'Основы программирования для новичков',
//           videoUrl: 'https://youtube.com/watch?v=programming-basics-101',
//         },
//       },
//     },
//   ];
// }
//
// function getQuotePosts() {
//   return [
//     {
//       id: FOURTH_POST_UUID,
//       authorId: FIRST_USER_ID,
//       type: 'quote' as PostType,
//       state: 'published' as PostState,
//       tags: {
//         connect: [{ id: FIRST_TAG_UUID }, { id: SECOND_TAG_UUID }],
//       },
//       quotePost: {
//         create: {
//           quote:
//             'Код - это поэзия в действии. Каждая строка должна быть продумана и элегантна.',
//           quoteAuthor: 'Стив Джобс',
//         },
//       },
//     },
//   ];
// }
//
// function getPhotoPosts() {
//   return [
//     {
//       id: FIFTH_POST_UUID,
//       authorId: FIRST_USER_ID,
//       type: 'photo' as PostType,
//       state: 'published' as PostState,
//       tags: {
//         connect: [{ id: FIRST_TAG_UUID }, { id: SECOND_TAG_UUID }],
//       },
//       photoPost: {
//         create: {
//           photoUrl:
//             'https://example.com/photos/modern-architecture-building.jpg',
//         },
//       },
//     },
//   ];
// }
//
// function getLinkPosts() {
//   return [
//     {
//       id: SIXTH_POST_UUID,
//       authorId: SECOND_USER_ID,
//       type: 'link' as PostType,
//       state: 'published' as PostState,
//       tags: {
//         connect: [{ id: FIRST_TAG_UUID }, { id: SECOND_TAG_UUID }],
//       },
//       linkPost: {
//         create: {
//           url: 'https://github.com/microsoft/vscode',
//           description:
//             'Популярный редактор кода от Microsoft с огромным количеством расширений',
//         },
//       },
//     },
//   ];
// }
//
// async function seedDb(prismaClient: PrismaClient) {
//   const mockTags = getTags();
//   for (const tag of mockTags) {
//     await prismaClient.tag.upsert({
//       where: { id: tag.id },
//       update: {},
//       create: {
//         id: tag.id,
//         name: tag.name,
//       },
//     });
//   }
//
//   const mockTextPosts = getTextPosts();
//   const mockVideoPosts = getVideoPosts();
//   const mockQuotePosts = getQuotePosts();
//   const mockPhotoPosts = getPhotoPosts();
//   const mockLinkPosts = getLinkPosts();
//
//   for (const post of mockTextPosts) {
//     await prismaClient.post.create({
//       data: {
//         authorId: post.authorId,
//         type: post.type,
//         state: post.state,
//         tags: post.tags,
//         textPost: post.textPost,
//       },
//     });
//   }
//
//   for (const post of mockVideoPosts) {
//     await prismaClient.post.create({
//       data: {
//         authorId: post.authorId,
//         type: post.type,
//         state: post.state,
//         tags: post.tags,
//         videoPost: post.videoPost,
//       },
//     });
//   }
//
//   for (const post of mockQuotePosts) {
//     await prismaClient.post.create({
//       data: {
//         authorId: post.authorId,
//         type: post.type,
//         state: post.state,
//         tags: post.tags,
//         quotePost: post.quotePost,
//       },
//     });
//   }
//
//   for (const post of mockPhotoPosts) {
//     await prismaClient.post.create({
//       data: {
//         authorId: post.authorId,
//         type: post.type,
//         state: post.state,
//         tags: post.tags,
//         photoPost: post.photoPost,
//       },
//     });
//   }
//
//   for (const post of mockLinkPosts) {
//     await prismaClient.post.create({
//       data: {
//         authorId: post.authorId,
//         type: post.type,
//         state: post.state,
//         tags: post.tags,
//         linkPost: post.linkPost,
//       },
//     });
//   }
//
//   console.info('🤘️ Database was filled');
// }
//
// async function bootstrap() {
//   const prismaClient = new PrismaClient();
//
//   try {
//     await seedDb(prismaClient);
//     globalThis.process.exit(0);
//   } catch (error: unknown) {
//     console.error(error);
//     globalThis.process.exit(1);
//   } finally {
//     await prismaClient.$disconnect();
//   }
// }
//
// bootstrap();
