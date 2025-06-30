import { connectToMongo } from "./mongoClient";

export async function deleteUserByEmail(email: string) {
  const client = await connectToMongo();
  const db = client.db("user");
  const users = db.collection("users");

  const result = await users.deleteOne({ email });

  if (result.deletedCount === 0) {
    console.log(`❌ No user deleted. Email not found: ${email}`);
  } else {
    console.log(`✅ Deleted user: ${email}`);
  }

  await client.close();
}
