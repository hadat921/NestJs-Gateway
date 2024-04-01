import { Prisma } from '@prisma/client';

const selectBookWithBookTag: Prisma.BookSelect = {
  id: true,
  title: true,
  author: true,
  category: true,
  numberOfpages: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      lastName: true,
      firstName: true,
      email: true,
    },
  },
  BookTag: {
    select: {
      tagId: true,
    },
  },
};

export { selectBookWithBookTag };
