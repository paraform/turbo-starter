import { PrismaClient, Prisma, UserPlan } from "@prisma/client";
import { hashPassword } from "@company/utils/auth";

const prisma = new PrismaClient();

async function createUser(opts: {
  user: {
    email: string;
    password: string;
    username: string;
    name: string;
    plan: UserPlan;
    completedOnboarding?: boolean;
    timeZone?: string;
  };
}) {
  const userData: Prisma.UserCreateArgs["data"] = {
    ...opts.user,
    password: await hashPassword(opts.user.password),
    emailVerified: new Date(),
    completedOnboarding: opts.user.completedOnboarding ?? true,
    locale: "en",
  };
  const user = await prisma.user.upsert({
    where: { email: opts.user.email },
    update: userData,
    create: userData,
  });

  console.log(
    `👤 Upserted '${opts.user.username}' with email "${opts.user.email}" & password "${opts.user.password}".`
  );

  return user;
}

async function main() {
  await createUser({
    user: {
      email: "free@example.com",
      password: "free",
      username: "free",
      name: "Free Example",
      plan: "FREE",
    },
  });
}

main()
  .then(() => {
    console.log("🌱 Seeded db");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
