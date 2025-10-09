import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const userModel = {
  // create user
  create: async ({ email, password }: { email: string; password: string }) => {
    const [newUser] = await db
      .insert(userTable)
      .values({ email, password })
      .returning();
    return newUser;
  },
  // get user by email
  getByEmail: async (email: string) => {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email.trim()))
      .limit(1);
    return user;
  },
};
