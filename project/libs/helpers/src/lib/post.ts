import { PostWithIncludes } from '@project/types';

export function flatPost(document: PostWithIncludes | null) {
  if (!document) {
    return null;
  }

  const {
    photoPost,
    quotePost,
    linkPost,
    textPost,
    videoPost,
    _count,
    ...other
  } = document;

  return {
    ...other,
    ...linkPost,
    ...textPost,
    ...videoPost,
    ...photoPost,
    ...quotePost,
    ..._count,
  };
}
