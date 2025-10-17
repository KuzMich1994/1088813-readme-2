export const POST_INCLUDES = {
  tags: true,
  comments: true,
  photoPost: true,
  videoPost: true,
  linkPost: true,
  quotePost: true,
  textPost: true,
  _count: {
    select: { likes: true },
  },
};
