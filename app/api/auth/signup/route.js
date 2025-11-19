import { NextResponse } from "next/server";
import { SignupSchema } from "@/lib/definitions";
import { createUser } from "@/lib/userStoreFs";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        const body = await req.json();
        const parsed = SignupSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        const user = await createUser({ name, email, password });
        const token = signToken({ id: user.id, email: user.email });

        return NextResponse.json(
            {success:true , user, token},
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}