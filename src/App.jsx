import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import gql from "graphql-tag";

import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useMutation, useQuery } from "@apollo/client/react";

import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Routes, Route, Link, useNavigate } from "react-router";
import ListingsDetail from "./components/ListingsDetail";

import AirbnbFooter from "./components/Footer";
import Admin from "./components/Admin";

import Bookings from "./components/Bokings"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";

import { useAuth } from "./Store/useAuth";

const GET_ITEMS = gql`
  query Query($limit: Int) {
    featuredListings(limit: $limit) {
      address
      bathrooms
      bedrooms
      beds
      category
      description
      guests
      id
      images
      location
      rating
      title
    }
  }
`;

const GET_FAVORITES = gql`
  query {
    favorites {
      id
      title
      address
      images
      location
      rating
    }
  }
`;

const ADD_FAV = gql`
  mutation AddFavorite($listingId: ID!) {
    addFavorite(listingId: $listingId) {
      address
    }
  }
`;

const REMOVE_FAV = gql`
  mutation RemoveFavorite($listingId: ID!) {
    removeFavorite(listingId: $listingId) {
      address
    }
  }
`;

function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpenToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  const { accessToken } = useAuth();
  const [isLogin, setIsLogin] = useState(false);



  useEffect(() => {
    setIsLogin(!!accessToken);
  }, [accessToken]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data, loading } = useQuery(GET_ITEMS, {
    variables: { limit: 12 },
  });

  const {
    data: favoriteData,
    refetch: refetchFavorites,
  } = useQuery(GET_FAVORITES, {
    skip: !accessToken,
  });

  const [addFav] = useMutation(ADD_FAV, {
    onCompleted: () => {
      setToastError(false);
      setToastMessage("muvaffaqiyatli qo'shildi");
      setOpenToast(true);
      refetchFavorites();
    },
    onError: (err) => {
      setToastError(true);
      setToastMessage(err.message);
      setOpenToast(true);
    },
  });

  const [removeFav] = useMutation(REMOVE_FAV, {
    onCompleted: () => {
      setToastError(false);
      setToastMessage("muvaffaqiyatli o'chirildi");
      setOpenToast(true);
      refetchFavorites();
    },
    onError: (err) => {
      setToastError(true);
      setToastMessage(err.message);
      setOpenToast(true);
    },
  });

  const items = data?.featuredListings?.filter((item) => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      item.title?.toLowerCase().includes(value) ||
      item.location?.toLowerCase().includes(value) ||
      item.address?.toLowerCase().includes(value) ||
      item.category?.toLowerCase().includes(value)
    );
  });

  const favoriteIds =
    favoriteData?.favorites?.map((favorite) => favorite.id) || [];

  const addFavorite = (id) => {
    if (!accessToken) {
      setOpenLogin(true);
      return;
    }

    addFav({
      variables: {
        listingId: id,
      },
    });
  };

  const removeFavorite = (id) => {
    removeFav({
      variables: {
        listingId: id,
      },
    });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          color: "#222",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr auto",
              sm: "1fr auto",
              md: "1fr auto 1fr",
            },
            alignItems: "center",
            gap: { xs: 1, sm: 2, md: 3 },
            px: { xs: 1.5, sm: 3, md: 6 },
            py: { xs: 1.5, md: 0 },
            minHeight: { xs: "auto", md: "72px" },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#FF385C",
              justifySelf: "start",
              fontSize: { xs: "22px", sm: "25px", md: "28px" },
            }}
          >
            Airbnb
          </Typography>

          <Box
            sx={{
              gridColumn: { xs: "1 / -1", sm: "1 / -1", md: 2 },
              gridRow: { xs: 2, sm: 2, md: 1 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              order: { xs: 3, md: 0 },
            }}
          >
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "11px 20px",
                borderRadius: "24px",
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
                maxWidth: "320px",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </Box>

          <Box
            sx={{
              gridColumn: { xs: 2, sm: 2, md: 3 },
              gridRow: { xs: 1, sm: 1, md: 1 },
              justifySelf: "end",
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              alignItems: "center",
            }}
          >
            {user && isLogin ? (
              <>
                <Button
                  component={Link}
                  to="/bokings"
                  sx={{
                    color: "#222",
                    borderRadius: "24px",
                    textTransform: "none",
                    fontSize: { xs: 13, sm: 14 },
                    minWidth: { xs: 75, sm: 90 },
                    px: { xs: 1, sm: 1.5 },
                  }}
                >
                  Bookings
                </Button>

                <Avatar
                  sx={{
                    bgcolor: deepPurple[500],
                    width: { xs: 34, sm: 40 },
                    height: { xs: 34, sm: 40 },
                    fontSize: { xs: 14, sm: 16 },
                  }}
                >
                  {user.name
                    ? user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                    : "OP"}
                </Avatar>

                <Button
                  onClick={handleLogOut}
                  sx={{
                    minWidth: { xs: 38, sm: 44 },
                    px: { xs: 0.5, sm: 1 },
                  }}
                >
                  <LogoutIcon fontSize="small" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setOpenLogin(true)}
                  variant="outlined"
                  sx={{
                    borderColor: "#FF385C",
                    color: "#FF385C",
                    borderRadius: "24px",
                    textTransform: "none",
                    minWidth: { xs: 70, sm: 80 },
                    px: { xs: 1.5, sm: 2 },
                    fontSize: { xs: 13, sm: 14 },
                  }}
                >
                  Login
                </Button>

                <Button
                  onClick={() => setOpenSignup(true)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF385C",
                    borderRadius: "24px",
                    textTransform: "none",
                    boxShadow: "none",
                    minWidth: { xs: 75, sm: 90 },
                    px: { xs: 1.5, sm: 2 },
                    fontSize: { xs: 13, sm: 14 },

                  }}
                >
                  Sign Up
                </Button>

                <Button
                  onClick={() => setOpenLogin(true)}
                  variant="text"
                  sx={{
                    color: "#222",
                    borderRadius: "24px",
                    textTransform: "none",
                    fontSize: { xs: 13, sm: 14 },
                    minWidth: { xs: 70, sm: 85 },
                  }}
                >
                  Bookings
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            mx: { xs: 1.5, sm: 2 },
            borderRadius: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Login setIsOpen={setOpenLogin} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openSignup}
        onClose={() => setOpenSignup(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            mx: { xs: 1.5, sm: 2 },
            borderRadius: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Signup setIsOpen={setOpenSignup} />
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 1.5, sm: 2.5, md: 3 },
          py: { xs: 2.5, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: { xs: 2.5, sm: 3, md: 4 },
            fontSize: { xs: "24px", sm: "30px", md: "34px" },
            lineHeight: 1.2,
          }}
        >
          Стамбул: популярное жилье
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : items?.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
              gap: { xs: 2.5, sm: 2.5, md: 3 },
            }}
          >
            {items.map((item) => {
              const image = Array.isArray(item.images)
                ? item.images[0]
                : item.images;

              const isFavorite = favoriteIds.includes(item.id);

              return (
                <Box key={item.id} sx={{ minWidth: 0 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: 240, sm: 220, md: 240, lg: 260 },
                      borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                      overflow: "hidden",
                      backgroundColor: "#eee",
                    }}
                  >
                    <img
                      src={image}
                      alt={item.title || "Listing"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFavorite) {
                          removeFavorite(item.id);
                        } else {
                          addFavorite(item.id);
                        }
                      }}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 2,
                        p: 1,
                        "&:hover": {
                          backgroundColor: "transparent",
                          transform: "scale(1.1)",
                        },
                        transition: "transform 0.2s ease-in-out",
                      }}
                    >
                      {isFavorite ? (
                        <FavoriteIcon
                          sx={{
                            color: "#FF385C",
                            fontSize: 28,
                            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            color: "#fff",
                            fontSize: 28,
                            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.6))",
                          }}
                        />
                      )}
                    </IconButton>
                  </Box>

                  <Box sx={{ pt: { xs: 1.2, sm: 1.5 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: 14, sm: 15 },
                          lineHeight: 1.35,
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { xs: 13, sm: 14 },
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.rating ?? "New"}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: "#717171",
                        fontSize: { xs: 13, sm: 14 },
                        mt: 0.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.location || item.address}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#717171",
                        fontSize: { xs: 13, sm: 14 },
                        mt: 0.3,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.guests ? `${item.guests} guests` : ""}
                      {item.bedrooms ? ` · ${item.bedrooms} bedrooms` : ""}
                      {item.beds ? ` · ${item.beds} beds` : ""}
                      {item.bathrooms ? ` · ${item.bathrooms} baths` : ""}
                    </Typography>

                    {item.category && (
                      <Typography
                        sx={{
                          color: "#717171",
                          fontSize: { xs: 13, sm: 14 },
                          mt: 0.3,
                        }}
                      >
                        {item.category}
                      </Typography>
                    )}

                    {item.description && (
                      <Typography
                        sx={{
                          color: "#717171",
                          fontSize: { xs: 12.5, sm: 13 },
                          mt: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}

                    <Button
                      fullWidth
                      component={Link}
                      to={`/listing/${item.id}`}
                      variant="contained"
                      sx={{
                        mt: { xs: 1.2, sm: 1.5 },
                        backgroundColor: "#FF385C",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "none",
                        minHeight: { xs: 42, sm: 44 },
                        "&:hover": {
                          backgroundColor: "#e03150",
                          boxShadow: "none",
                        },
                      }}
                    >
                      View listing
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography sx={{ color: "#717171" }}>
            Hech qanday uy topilmadi.
          </Typography>
        )}

        {isLogin && (
          <Box sx={{ mt: { xs: 5, sm: 6, md: 8 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: { xs: 2.5, sm: 3, md: 4 },
                fontSize: { xs: "24px", sm: "30px", md: "34px" },
              }}
            >
              My Favorites
            </Typography>

            {favoriteData?.favorites?.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
                  },
                  gap: { xs: 2.5, sm: 2.5, md: 3 },
                }}
              >
                {favoriteData.favorites.map((item) => {
                  const image = Array.isArray(item.images)
                    ? item.images[0]
                    : item.images;

                  return (
                    <Box key={item.id} sx={{ minWidth: 0 }}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: { xs: 240, sm: 220, md: 240, lg: 250 },
                          borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                          overflow: "hidden",
                          backgroundColor: "#eee",
                        }}
                      >
                        {image && (
                          <img
                            src={image}
                            alt={item.title || "Favorite"}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 600,
                          mt: 1.5,
                          fontSize: { xs: 14, sm: 15 },
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#717171",
                          fontSize: { xs: 13, sm: 14 },
                          mt: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.location || item.address}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#717171",
                          fontSize: { xs: 13, sm: 14 },
                          mt: 0.5,
                        }}
                      >
                        Rating: {item.rating ?? "New"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 1,
                          mt: 1.5,
                        }}
                      >
                        <Button
                          component={Link}
                          to={`/listing/${item.id}`}
                          variant="contained"
                          sx={{
                            flex: 1,
                            backgroundColor: "#FF385C",
                            borderRadius: "10px",
                            textTransform: "none",
                            boxShadow: "none",
                            minHeight: 42,
                            "&:hover": {
                              backgroundColor: "#e03150",
                              boxShadow: "none",
                            },
                          }}
                        >
                          View
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => removeFavorite(item.id)}
                          sx={{
                            flex: 1,
                            color: "#FF385C",
                            borderColor: "#FF385C",
                            borderRadius: "10px",
                            textTransform: "none",
                            minHeight: 42,
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography sx={{ color: "#717171" }}>
                Sizda hali yoqtirilgan uylar yo'q.
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <AirbnbFooter />

      <Snackbar
        open={isOpenToast}
        autoHideDuration={4000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={toastError ? "error" : "success"}
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing/:id" element={<ListingsDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Signup />} />
      <Route path="/foter" element={<AirbnbFooter />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/bokings" element={<Bookings />} />
    </Routes>
  );
}

export default App;