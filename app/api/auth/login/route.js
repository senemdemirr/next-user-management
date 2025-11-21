import { NextResponse } from "next/server";
import { LoginSchema } from "@/lib/definitions";
import { findUserByCredential } from "@/lib/userStoreFs";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        const body = await req.json();
        const parsed = LoginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.issues[0].message },
                { status: 400 }
            );
        }
        const { email, password } = parsed.data;
        const user = await findUserByCredential(email, password);
        if (!user) {
            return NextResponse.json(
                {
                    success: false, error: "Email or password is incorrect"
                },
                { status: 401 }
            )
        }
        const token = signToken({ id: user.id, email: user.email })

        return NextResponse.json(
            {
                success: true,
                user: { id: user.id, name: user.name, email: user.email },
                token
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false, error: error.message ||  "Server error"
            },
            { status: 500 }
        )
    }
}