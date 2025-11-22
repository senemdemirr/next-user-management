"use client";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Account() {
    const router = useRouter();

    const token = localStorage.getItem("auth_token");

    const storedUser = localStorage.getItem("auth_user");
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);

    function LogOut() {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token");
        router.push("/login");
    }
    async function DeleteAccount(e) {
        e.preventDefault();
        if (confirm("Are you sure delete the account")) {
            const res = await fetch("/api/auth/delete-account", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: user.id })
            })
            const data = res.json();

            if (!data.success) {
                console.log("data.error", data.error);
            }
            router.push("/signup");
        }
    }
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <Typography variant="h6" className="!text-gray-600"> Hello <Typography component="span" className="!text-2xl">{user?.name}</Typography>
            </Typography>
            <div className="flex flex-row !mt-4">
                <Button variant="contained" onClick={LogOut} className="!me-2"> Log out </Button>
                <Button variant="contained" color="error" onClick={DeleteAccount}> Delete Account </Button>
            </div>
        </div>

    )
}