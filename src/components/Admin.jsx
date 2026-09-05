import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Paper, Alert
} from '@mui/material';

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('isAdmin');
        if (auth === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        title: '',
        price: '',
        rating: '',
        image: ''
    });

    const handleLogin = () => {
        if (email === 'admin@example.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            setError('');
        } else {
            setError('xato');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    if (!isAdmin) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ color: '#1976d2', textAlign: 'center', mb: 3, }}>
                        Admin Panel
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Email "
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Parol "
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />

                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            sx={{
                                mt: 1,
                                height: 48,
                                backgroundColor: '#1976d2',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#1565c0' }
                            }}
                        >
                            KIRISH
                        </Button>
                    </Box>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9', p: 2 }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 450, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: '500', mb: 1, color: '#222' }}>
                    Yangi uy sotish
                </Typography>

                <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    onClick={handleLogout}
                    sx={{
                        fontSize: '11px',
                        marginLeft: "382px"
                    }}
                >
                    CHIQISH
                </Button>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField
                        label="Nomi"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Kunlik narxi"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Reyting (1 - 5)"
                        name="rating"
                        type="number"
                        value={form.rating}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="image url"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 1,
                            height: 48,
                            backgroundColor: '#0a0c0a',
                            fontSize: '15px',
                        }}
                    >
                        qo'shish
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}