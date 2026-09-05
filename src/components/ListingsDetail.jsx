import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
    Container,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";

const DETAILS = gql`
  query Query($listingId: ID!) {
    listing(id: $listingId) {
      title
      reviewsCount
      rating
      pricePerNight
      location
      isFeatured
      images
      id
      guests
      description
      createdAt
      category
      beds
      bedrooms
      bathrooms
      amenities
      address
    }
  }
`;
function ListingsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(DETAILS, {
        variables: { listingId: id },
    });
    const listing = data?.listing;
    console.log(listing);

    return (
        <Container maxWidth="lg">
            <Typography variant="h5">
                <IconButton onClick={() => navigate(-1)}>
                    Back
                </IconButton>
            </Typography>
            <br />
            <br />
            {loading && (
                <Typography
                    variant="h3"
                    style={{ textAlign: "center" }}
                    color="black"
                >
                    Loading...
                </Typography>
            )}
            {error && (
                <Typography variant="h1" color="error">
                    {error.message}
                </Typography>
            )}
            {listing && (
                <Container key={listing.id}>
                    {Array.isArray(listing.images) &&
                        listing.images.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`${listing.title} - ${index + 1}`}
                                style={{
                                    width: "350px",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        ))}


                    <Stack direction="row" sx={{ alignItems: "center", gap: 35 }}>
                        <Typography variant="h4">{listing.title}</Typography>
                        <Paper sx={{ padding: 1 }} elevation={3}>
                            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                            </Stack>
                        </Paper>
                    </Stack>
                    <Stack direction="row" sx={{ gap: 1 }}>
                        <Typography variant="h5">{listing.guests} Guests </Typography>
                        <Typography variant="h5"> {listing.bedrooms} Bathroom </Typography>
                        <Typography variant="h5">{listing.beds} Beds </Typography>
                        <Typography variant="h5">
                            {listing.bathrooms} Bathrooms
                        </Typography>
                        <Typography variant="h5">{listing.category} •</Typography>
                        <Typography color="success" variant="h5">
                            {listing.rating} Rating
                        </Typography>
                    </Stack>
                    <br />
                    <Divider />
                    <br />
                    <Stack>
                        <Stack direction="row" spacing={3}>
                            <Stack>
                                <Typography variant="h4">Address</Typography>
                                <br />
                                <Typography variant="h6">{listing.address}</Typography>
                                <br />
                                <Typography variant="h4">Location</Typography>
                                <Typography variant="h6">{listing.location}</Typography>
                            </Stack>
                        </Stack>
                        <br />

                        <Divider />
                        <br />
                        {listing.amenities.map((e) => (
                            <Typography key={e} variant="h5">
                                {e}
                            </Typography>
                        ))}
                    </Stack>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h4">Description </Typography>
                    <br />
                    <Typography variant="h6">{listing.description}</Typography>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h4">Comments{listing.reviewsCount}</Typography>
                </Container>
            )}
        </Container>
    );
}
export default ListingsDetail;
