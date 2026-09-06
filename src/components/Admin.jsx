import  { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert
} from '@mui/material';

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [form, setForm] = useState({
        title: '',
        price: '',
        rating: '',
        image: ''
    });

    useEffect(() => {
        const auth = localStorage.getItem('isAdmin');

        if (auth === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const handleLogin = () => {
        if (email === 'admin@example.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            setError('');
        } else {
            setError("Email yoki parol noto'g'ri");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');

        setIsAdmin(false);
        setEmail('');
        setPassword('');
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAdd = () => {
        setError('');
        setSuccess('');

        if (!form.title || !form.price || !form.rating || !form.image) {
            setError("Iltimos, barcha maydonlarni to'ldiring");
            return;
        }

        if (Number(form.rating) < 1 || Number(form.rating) > 5) {
            setError("Reyting 1 dan 5 gacha bo'lishi kerak");
            return;
        }

        const oldHomes = JSON.parse(
            localStorage.getItem('homes') || '[]'
        );

        const newHome = {
            id: Date.now(),
            title: form.title,
            price: Number(form.price),
            rating: Number(form.rating),
            image: form.image
        };

        const updatedHomes = [...oldHomes, newHome];

        localStorage.setItem(
            'homes',
            JSON.stringify(updatedHomes)
        );

        setForm({
            title: '',
            price: '',
            rating: '',
            image: ''
        });

        setSuccess("Uy muvaffaqiyatli qo'shildi!");
    };

    if (!isAdmin) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9',
                    p: 2
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        maxWidth: 400,
                        borderRadius: 3
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#1976d2',
                            textAlign: 'center',
                            mb: 3
                        }}
                    >
                        Admin Panel
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Parol"
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
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                }
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
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                p: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 3
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: '500',
                            color: '#222'
                        }}
                    >
                        Yangi uy sotish
                    </Typography>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleLogout}
                        sx={{
                            fontSize: '11px'
                        }}
                    >
                        CHIQISH
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5
                    }}
                >
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
                        inputProps={{
                            min: 1,
                            max: 5,
                            step: 0.1
                        }}
                        value={form.rating}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Image URL"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAdd}
                        sx={{
                            mt: 1,
                            height: 48,
                            backgroundColor: '#0a0c0a',
                            fontSize: '15px',
                            '&:hover': {
                                backgroundColor: '#222'
                            }
                        }}
                    >
                        QO'SHISH
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
