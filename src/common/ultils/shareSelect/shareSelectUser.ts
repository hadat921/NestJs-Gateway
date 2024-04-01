import { Prisma } from '@prisma/client';

const selectUserWithBooks: Prisma.UserSelect = {
  id: true,
  email: true,
  lastName: true,
  firstName: true,
  books: {
    select: {
      id: true,
      title: true,
      category: true,
      numberOfpages: true,
      createdAt: true,
    },
  },
};

export { selectUserWithBooks };
