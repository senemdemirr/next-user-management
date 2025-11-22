"use client";
import { Button, Card, CardContent, TextField, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState();

    async function resetPassword(e) {
        e.preventDefault();

        const res = await fetch('/api/auth/forgot-password', {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application.json' ,
            },
            body: JSON.stringify({ email, newPassword })
        });

        const data = await res.json();

        if (!data.success) {
            setError(data.error);
            return;
        }

        router.push("/login");
    }
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center">
            <Card className="w-100 h-100">
                <CardContent className="h-100 w-100 flex flex-col justify-evenly">
                    {error && <Alert severity="error">{error}</Alert>}
                    <Typography variant="h5" align="center">Forgot Password</Typography>
                    <form onSubmit={resetPassword}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>
                        <TextField
                            type="password"
                            fullWidth
                            variant="standard"
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="!mt-4"
                        ></TextField>
                        <Button fullWidth type="submit" variant="contained" className="!mt-8">Reset My Password</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}