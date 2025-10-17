import { Prisma } from '@prisma/client';

export interface PostFilter {
  id?: string;
  title?: string;
}

export function postFilterToPrismaFilter(
  filter?: PostFilter
): Prisma.PostWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  const prismaFilter: Prisma.PostWhereInput = {
    state: 'published',
  };

  if (filter.title) {
    prismaFilter.OR = [
      { textPost: { title: { contains: filter.title, mode: 'insensitive' } } },
      { videoPost: { title: { contains: filter.title, mode: 'insensitive' } } },
    ];
  }

  return prismaFilter;
}
