import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'John Doe',
      password: 'test_1234',
    },
  });

  console.log('Created new user:', newUser);
}

main().catch((e) => {
    console.error(e);
}).finally(async () => {
    await prisma.$disconnect();
});
