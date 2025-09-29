"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var Faker = require("@faker-js/faker");
var faker = Faker.faker;
var FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
var SECOND_USER_ID = '6581762309c030b503e30512';
function createRandomTag() {
    return {
        id: faker.string.uuid(),
        name: faker.word.noun({ length: { min: 3, max: 10 } }),
    };
}
function getTags() {
    return Array.from({ length: 10 }, function () { return createRandomTag(); });
}
var generatedTags = getTags();
function createRandomVideoPost() {
    return {
        id: faker.string.uuid(),
        authorId: FIRST_USER_ID,
        type: 'video',
        state: 'published',
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
        type: 'text',
        state: 'published',
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
        type: 'photo',
        state: 'published',
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
        type: 'quote',
        state: 'published',
        tags: {
            connect: [{ id: generatedTags[6].id }, { id: generatedTags[8].id }],
        },
        quotePost: {
            create: {
                quote: faker.lorem.paragraph({ min: 20, max: 300 }),
                quoteAuthor: "".concat(faker.person.firstName(), " ").concat(faker.person.lastName()),
            },
        },
    };
}
function createRandomLinkPost() {
    return {
        id: faker.string.uuid(),
        authorId: SECOND_USER_ID,
        type: 'quote',
        state: 'published',
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
    return Array.from({ length: 10 }, function () { return createRandomTextPost(); });
}
function getRandomVideoPosts() {
    return Array.from({ length: 10 }, function () { return createRandomVideoPost(); });
}
function getRandomQuotePosts() {
    return Array.from({ length: 10 }, function () { return createRandomQuotePost(); });
}
function getRandomPhotoPosts() {
    return Array.from({ length: 10 }, function () { return createRandomPhotoPost(); });
}
function getRandomLinkPosts() {
    return Array.from({ length: 10 }, function () { return createRandomLinkPost(); });
}
var textPosts = getRandomTextPosts();
var videoPosts = getRandomVideoPosts();
var quotePosts = getRandomQuotePosts();
var photoPosts = getRandomPhotoPosts();
var linkPosts = getRandomLinkPosts();
function createRandomComment() {
    return {
        userId: FIRST_USER_ID,
        postId: textPosts[0].id,
        text: faker.lorem.paragraphs({ min: 10, max: 300 }),
    };
}
function getRandomComments() {
    return Array.from({ length: 10 }, function () { return createRandomComment(); });
}
var comments = getRandomComments();
function getLikes() {
    return Array.from({ length: 10 }, function (_, index) { return ({
        userId: FIRST_USER_ID,
        postId: textPosts[index].id,
    }); });
}
var likes = getLikes();
function seedDb(prismaClient) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, generatedTags_1, tag, _a, textPosts_1, post, _b, videoPosts_1, post, _c, quotePosts_1, post, _d, photoPosts_1, post, _e, linkPosts_1, post, _f, comments_1, comment, _g, likes_1, like;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _i = 0, generatedTags_1 = generatedTags;
                    _h.label = 1;
                case 1:
                    if (!(_i < generatedTags_1.length)) return [3 /*break*/, 4];
                    tag = generatedTags_1[_i];
                    return [4 /*yield*/, prismaClient.tag.upsert({
                            where: { id: tag.id },
                            update: {},
                            create: {
                                id: tag.id,
                                name: tag.name,
                            },
                        })];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = 0, textPosts_1 = textPosts;
                    _h.label = 5;
                case 5:
                    if (!(_a < textPosts_1.length)) return [3 /*break*/, 8];
                    post = textPosts_1[_a];
                    return [4 /*yield*/, prismaClient.post.create({
                            data: {
                                id: post.id,
                                authorId: post.authorId,
                                type: post.type,
                                state: post.state,
                                tags: post.tags,
                                textPost: post.textPost,
                            },
                        })];
                case 6:
                    _h.sent();
                    _h.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    _b = 0, videoPosts_1 = videoPosts;
                    _h.label = 9;
                case 9:
                    if (!(_b < videoPosts_1.length)) return [3 /*break*/, 12];
                    post = videoPosts_1[_b];
                    return [4 /*yield*/, prismaClient.post.create({
                            data: {
                                id: post.id,
                                authorId: post.authorId,
                                type: post.type,
                                state: post.state,
                                tags: post.tags,
                                videoPost: post.videoPost,
                            },
                        })];
                case 10:
                    _h.sent();
                    _h.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12:
                    _c = 0, quotePosts_1 = quotePosts;
                    _h.label = 13;
                case 13:
                    if (!(_c < quotePosts_1.length)) return [3 /*break*/, 16];
                    post = quotePosts_1[_c];
                    return [4 /*yield*/, prismaClient.post.create({
                            data: {
                                id: post.id,
                                authorId: post.authorId,
                                type: post.type,
                                state: post.state,
                                tags: post.tags,
                                quotePost: post.quotePost,
                            },
                        })];
                case 14:
                    _h.sent();
                    _h.label = 15;
                case 15:
                    _c++;
                    return [3 /*break*/, 13];
                case 16:
                    _d = 0, photoPosts_1 = photoPosts;
                    _h.label = 17;
                case 17:
                    if (!(_d < photoPosts_1.length)) return [3 /*break*/, 20];
                    post = photoPosts_1[_d];
                    return [4 /*yield*/, prismaClient.post.create({
                            data: {
                                id: post.id,
                                authorId: post.authorId,
                                type: post.type,
                                state: post.state,
                                tags: post.tags,
                                photoPost: post.photoPost,
                            },
                        })];
                case 18:
                    _h.sent();
                    _h.label = 19;
                case 19:
                    _d++;
                    return [3 /*break*/, 17];
                case 20:
                    _e = 0, linkPosts_1 = linkPosts;
                    _h.label = 21;
                case 21:
                    if (!(_e < linkPosts_1.length)) return [3 /*break*/, 24];
                    post = linkPosts_1[_e];
                    return [4 /*yield*/, prismaClient.post.create({
                            data: {
                                id: post.id,
                                authorId: post.authorId,
                                type: post.type,
                                state: post.state,
                                tags: post.tags,
                                linkPost: post.linkPost,
                            },
                        })];
                case 22:
                    _h.sent();
                    _h.label = 23;
                case 23:
                    _e++;
                    return [3 /*break*/, 21];
                case 24:
                    _f = 0, comments_1 = comments;
                    _h.label = 25;
                case 25:
                    if (!(_f < comments_1.length)) return [3 /*break*/, 28];
                    comment = comments_1[_f];
                    return [4 /*yield*/, prismaClient.comment.create({
                            data: {
                                text: comment.text,
                                userId: comment.userId,
                                postId: comment.postId,
                            },
                        })];
                case 26:
                    _h.sent();
                    _h.label = 27;
                case 27:
                    _f++;
                    return [3 /*break*/, 25];
                case 28:
                    _g = 0, likes_1 = likes;
                    _h.label = 29;
                case 29:
                    if (!(_g < likes_1.length)) return [3 /*break*/, 32];
                    like = likes_1[_g];
                    return [4 /*yield*/, prismaClient.like.create({
                            data: {
                                userId: like.userId,
                                postId: like.postId,
                            },
                        })];
                case 30:
                    _h.sent();
                    _h.label = 31;
                case 31:
                    _g++;
                    return [3 /*break*/, 29];
                case 32:
                    console.info('🤘️ Database was filled');
                    return [2 /*return*/];
            }
        });
    });
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var prismaClient, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prismaClient = new client_1.PrismaClient();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 6]);
                    return [4 /*yield*/, seedDb(prismaClient)];
                case 2:
                    _a.sent();
                    globalThis.process.exit(0);
                    return [3 /*break*/, 6];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    globalThis.process.exit(1);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, prismaClient.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
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
