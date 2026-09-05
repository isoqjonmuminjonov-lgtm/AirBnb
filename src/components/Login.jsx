import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

import {
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    Box,
} from "@mui/material";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        email
        id
        name
      }
    }
  }
`;

function Login({ setIsOpen }) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setAccessToken, setUser } = useAuth();

    const [loginUser, { loading }] = useMutation(LoginMutation, {
        onCompleted: (res) => {
            const loginData = res?.login;

            if (loginData) {
                setAccessToken(loginData.accessToken);

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        accessToken: loginData.accessToken,
                    })
                );

                setUser(loginData.user);

                localStorage.setItem("user", JSON.stringify(loginData.user));

                toast.success("Tizimga muvaffaqiyatli kirdingiz!");

                if (setIsOpen) setIsOpen(false);
                navigate("/");
            }
        },

        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });

    const handleS = (formData) => {
        loginUser({
            variables: formData,
        });
    };

    return (
        <Container maxWidth="xs" sx={{ py: 2 }}>
            <Button
                onClick={() => setIsOpen && setIsOpen(false)}
                component={Link}
                to="/"
                startIcon={<ReplyAllIcon />}
                sx={{
                    mb: 2,
                    color: "#555",
                    textTransform: "none",
                    fontSize: 14,
                }}
            >
                Back to Home
            </Button>

            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "14px",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        px: 3,
                        py: 2.5,
                        borderBottom: "1px solid #eee",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: "#222",
                            mb: 0.5,
                        }}
                    >
                        Tizimga kirish
                    </Typography>
                </Box>

                {/* Form tegi orqali Enter bosilganda ham yuboriladigan qilindi */}
                <Box component="form" onSubmit={handleSubmit(handleS)}>
                    <Stack spacing={2.5} sx={{ p: 3 }}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email kiriting",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email"
                                    size="small"
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Parol kiriting",
                                minLength: {
                                    value: 6,
                                    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak.",
                                },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    size="small"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    error={!!error}
                                    helperText={error?.message}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        size="small"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            fullWidth
                            sx={{
                                height: 42,
                                backgroundColor: "#FF385C",
                                borderRadius: "9px",
                                textTransform: "none",
                                fontSize: 15,
                                fontWeight: 600,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#e93150",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            {loading ? "Kirilmoqda..." : "Log In"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;