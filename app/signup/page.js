"use client"
import { Card, CardContent, TextField, Typography, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                return;
            }


            router.push("/login");

        } catch (error) {
            console.log(error);
            setError(error);
        }

    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="w-100 h-100 flex !flex-col justify-around">
                <CardContent className="w-100">
                    <Typography variant="h5" align="center">Register</Typography>
                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name and Surname"
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            className="!mt-4"
                        ></TextField>
                        <TextField
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            className="!mt-4"
                        ></TextField>
                        <TextField
                            label="Password"
                            type="password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            className="!mt-4"
                        ></TextField>
                        <Button fullWidth type="submit" variant="contained" className="!mt-4"> Sign up </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}