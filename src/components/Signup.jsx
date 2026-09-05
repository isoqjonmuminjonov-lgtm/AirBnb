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
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";

const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
    ) {
      accessToken
      user {
        id
        name
        email
      }
    }
  }
`;

function Signup({ setIsOpen }) {
    const [showPassword, setShowPassword] = useState(false);

    const { setAccessToken, setUser } = useAuth();

    const {
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const [registerUser, { loading, error }] = useMutation(
        REGISTER_MUTATION, {
        onCompleted: () =>
            toast.success("Muvaffaqiyatli ro'yhatdan o'tdingiz"),
        onError: () => toast.error(error),
    }
    );

    const handleSignUp = async (formData) => {
        console.log("SIGNUP SUBMIT:", formData);

        try {
            const response = await registerUser({
                variables: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                },
            });

            console.log("SIGNUP RESPONSE:", response);

            const registerData = response?.data?.register;


            setAccessToken(registerData?.accessToken);
            setUser(registerData?.user);

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    accessToken: registerData.accessToken,
                })
            );

            localStorage.setItem(
                "user",
                JSON.stringify(registerData.user)
            );


            if (setIsOpen) {
                setIsOpen(false);
            }

            navigate("/");
        } catch (error) {
            console.error("SIGNUP ERROR:", error);

            toast.error(
                error?.message || "ro'yhatdan o'tilmadi"
            );
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                py: 2,
            }}
        >
            <Button
                onClick={() => setIsOpen?.(false)}

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
                        Hisob ochish
                    </Typography>

                    <Typography
                        sx={{
                            color: "#777",
                            fontSize: 14,
                        }}
                    >
                        Airbnbga qo'shiling
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <Stack
                        spacing={2.5}
                        sx={{
                            p: 3,
                        }}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Name kiriting",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Name kamida 2 ta belgidan iborat bo'lishi kerak.",
                                },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Name"
                                    size="small"
                                    error={!!error}
                                    helperText={error?.message}

                                />
                            )}
                        />

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
                                    type="email"
                                    error={!!error}
                                    helperText={error?.message}

                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password kiriting",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Parol kamida 6 ta belgidan iborat bo'lishi kerak.",
                                },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    size="small"
                                    label="Password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    error={!!error}
                                    helperText={error?.message}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        type="button"
                                                        edge="end"
                                                        size="small"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (prev) =>
                                                                    !prev
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
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
                            {loading
                                ? "Signing up..."
                                : "Sign Up"}
                        </Button>

                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: 13,
                                color: "#777",
                            }}
                        >
                            <Button
                                to="/"
                                onClick={() => setIsOpen?.(false)}
                                size="small"
                                sx={{
                                    ml: 0.5,
                                    p: 0,
                                    minWidth: "auto",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    color: "#FF385C",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}

export default Signup;
