import { NextResponse } from "next/server";
import { DeleteAccountSchema } from "@/lib/definitions";
import { deleteUser } from "@/lib/userStoreFs";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
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
        const parsed = DeleteAccountSchema.safeParse(body);

        if(!parsed.success){
            return NextResponse.json(
                {success: false, error: parsed.error.issues[0].message},
                {status: 400}
            )
        }

        await deleteUser({userId: payload.id, password: parsed.data.password});

        return NextResponse.json(
            {success: true, message: "Account deleted"},
            {status: 200}
        )

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}