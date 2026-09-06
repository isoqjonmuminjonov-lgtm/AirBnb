import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";

import {
    Container,
    Typography,
    IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const GET = gql`
    query GetReservations {
        bookings {
            id
            checkIn
            checkOut
            createdAt
            guests
            pricePerNight
            status
            totalNights
            totalPrice
            listing {
                id
                title
                images
                location
                pricePerNight
            }
        }
    }
`;

const PUT = gql`
    mutation CancelReservation($reservationId: ID!) {
        cancelBooking(bookingId: $reservationId) {
            id
        }
    }
`;

const Bookings = () => {
    const navigate = useNavigate();

    const {
        data,
        loading,
        error,
        refetch,
    } = useQuery(GET);

    const [cancelReservation, { loading: cancelling }] = useMutation(
        PUT,
        {
            onCompleted: () => {
                toast.success("Reservation cancelled");
                refetch();
            },
        }
    );

    if (loading) {
        return (
            <Container
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6">
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error">
                    {error.message}
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <IconButton
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: 600,
                }}
            >
                My Bookings
            </Typography>
        </Container>
    );
};

export default Bookings;
