import { users } from "@/app/lib/mockData/users";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const { email, password, remember } = await request.json();

    const user = users.find(
        (u) =>
            u.email === email &&
            u.password === password
    );

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
        });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.NEXTAUTH_SECRET as string,
        { expiresIn: "1d" }
    );

    const cookie = remember
            ? `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax Secure`
            : `token=${token}; HttpOnly; Path=/; SameSite=Lax Secure`;

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: {
            "Set-Cookie": cookie,
        },
    });
}