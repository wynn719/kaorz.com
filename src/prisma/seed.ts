import { PrismaClient, Prisma } from "@prisma/client";
import { SHA256 as sha256 } from "crypto-js";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "zaibeiwo",
    password: sha256("test").toString(),
  },
  {
    name: "yaoyao",
    password: sha256("test").toString(),
  },
];

const eventData: Prisma.EventCreateInput = {
  name: "shit",
};

async function main() {
  console.log(`Start seeding ...`);
  const event = await prisma.event.create({
    data: eventData,
  });
  console.log(`Created event with id: ${event.id}`);

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    await prisma.eventRecord.create({
      data: {
        userId: user.id,
        eventId: event.id,
      },
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
