"use client"
import { Button, Card, CardContent, TextField, Typography, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleFormSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        if (!data.success) {
            setError(data.message);
            return;
        }

        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_user", JSON.stringify(data.user));
        
        router.push("/account");
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Card className="flex !flex-col w-100 h-100 justify-around">
                <CardContent className="w-100 h-auto">
                    <Typography variant="h5" align="center" >Login</Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="standard"
                            value={email}
                            className="!mt-4"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="standard"
                            value={password}
                            className="!mt-4"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link className="float-end text-sm font-normal hover:underline underline-offset-1 hover:text-[#1976D2] mt-3" href={"/forgot-password"}> Forgot Password</Link>

                        <Button fullWidth variant="contained" type="submit" className="!mt-8">Sign in</Button>
                    </form>

                </CardContent>
                <Typography className="text-center mt-6">
                    Dont have an account <Link className="font-normal hover:underline underline-offset-1 hover:text-[#1976D2]" href={"/signup"}> Register</Link>
                </Typography>

            </Card>
        </div>
    )
}