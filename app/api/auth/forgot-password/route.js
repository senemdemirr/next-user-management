import { NextResponse } from "next/server";
import { PasswordUpdateSchema } from "@/lib/definitions";
import { updateUserPassword } from "@/lib/userStoreFs";
import { verifyToken } from "@/lib/jwt";

export async function PATCH(req) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth) {
            return NextResponse.json(
                { success: false, error: "Unauthorizated" },
                { status: 401 }
            )
        }

        const token = auth.split(" ")[1];
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { success: false, error: "Invalid token" },
                { status: 401 }
            )
        }

        const body = await req.json();
        const parsed = PasswordUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        const user = await updateUserPassword({
            userId: payload.id,
            oldPassword: parsed.data.oldPassword,
            newPassword: parsed.data.newPassword
        })

        return NextResponse.json(
            {
                success: true,
                user: { id: user.id, name: user.name, email: user.email }
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }

}