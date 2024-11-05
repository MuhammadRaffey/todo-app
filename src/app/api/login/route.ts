import { NextRequest, NextResponse } from "next/server";
import { db, userTable } from "@/lib/drizzle";
import { serialize } from "cookie";
import { eq } from "drizzle-orm";

// Handle GET request to fetch user details
export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const username = req.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "Username is missing" },
      { status: 400 }
    );
  }

  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .execute();

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// Handle POST request to authenticate a user
export const POST = async (request: NextRequest) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .execute();

    if (user.length === 0 || user[0].password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Set the auth-token cookie
    const token = "your-auth-token"; // Generate a real token here
    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set(
      "Set-Cookie",
      serialize("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
