import { NextResponse } from "next/server";
import { PasswordUpdateSchema } from "@/lib/definitions";
import { updateUserPassword } from "@/lib/userStoreFs";

export async function PATCH(req) {
    try {
        const body = await req.json();
        const parsed = PasswordUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }
        const user = await updateUserPassword({
            email: parsed.data.email,
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