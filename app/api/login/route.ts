import { users } from "@/app/lib/mockData/users";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, password, remember } = await request.json();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.NEXTAUTH_SECRET as string,
    { expiresIn: remember ? "7d" : "1d" }
  );

  const isProduction = process.env.NODE_ENV === "production";
  const baseCookie = `token=${token}; HttpOnly; Path=/; SameSite=Lax${isProduction ? "; Secure" : ""}`;
  const cookie = remember ? `${baseCookie}; Max-Age=604800` : baseCookie;

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}