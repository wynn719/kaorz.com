import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "zaibeiwo",
    password: "zaibeiwo",
  },
  {
    name: "yaoyao",
    password: "yaoyao",
  },
];

const eventData: Prisma.EventCreateInput[] = [
  {
    name: "shit",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const e of eventData) {
    const event = await prisma.event.create({
      data: e,
    });
    console.log(`Created event with id: ${event.id}`);
  }
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
