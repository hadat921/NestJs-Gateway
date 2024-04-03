import { Prisma } from '@prisma/client';

const selectUserWithBooks: Prisma.UserSelect = {
  id: true,
  email: true,
  lastName: true,
  firstName: true,
};

export { selectUserWithBooks };
