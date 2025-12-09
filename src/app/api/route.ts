import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: Request) {
    const sql = postgres(process.env.DATABASE_URL!);
    const users = await sql`SELECT * FROM users`;
    return NextResponse.json(users);
}
