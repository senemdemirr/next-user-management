"use client";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Account() {
    const router = useRouter();

    const storedUser = localStorage.getItem("auth_user");
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);

    function LogOut() {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token");
        router.push("/login");
    }
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <Typography variant="h6" className="!text-gray-600"> Hello <Typography component="span" className="!text-2xl">{user?.name}</Typography>
            </Typography>
            <Button variant="contained" onClick={LogOut} className="!mt-4"> Log out </Button>
        </div>

    )
}