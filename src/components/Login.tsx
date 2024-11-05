"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { db, userTable } from "@/lib/drizzle";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(25, {
      message: "Username can be max  25 characters.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(25, {
      message: "Password can be max  25 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Login successful");
      router.push("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-10 max-w-md mx-auto p-6 border-4 border-gray-300 rounded-lg shadow-md  "
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-semibold text-2xl">
          Username
        </label>
        <input
          id="username"
          {...register("username")}
          className="p-2 border-2 border-gray-300 rounded bg-secondary text-primary font-semibold"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-2xl">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="p-2 border-2 border-gray-300 rounded bg-secondary text-primary font-semibold"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

// Handler for the API route
export async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Handle POST request to authenticate a user
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const user = await db
        .select()
        .from(userTable)
        .where({ username, password })
        .execute();

      if (user.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set the auth-token cookie
      const token = "your-auth-token"; // Generate a real token here
      res.setHeader(
        "Set-Cookie",
        serialize("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })
      );

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ message: "Error logging in", error });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default Login;
