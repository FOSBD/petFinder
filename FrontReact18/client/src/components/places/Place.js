import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, StarBorder } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Place = () => {
  const {
    state: { place },
    dispatch,
  } = useValue();

  const [local, setLocal] = useState(null);

  useEffect(() => {
    if (place) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place.lng},${place.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setLocal(data.features[0]));
    }
  }, [place]);

  const handleClose = () => {
    dispatch({ type: "UPDATE_PLACE", payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(place)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {place?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {place?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="place" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={place?.uName || ""}
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              zIndex: 2,
            }}
          >
            <Avatar src={place?.uPhoto} />
          </Tooltip>
        </Swiper>

        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Rating: "}
              </Typography>
              <Typography component="span">
                {place?.rating === 0 ? "NA" : "" + place?.rating}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Place Local: "}
              </Typography>
              <Typography component="span">{local?.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Address: "}
              </Typography>
              <Typography component="span">{local?.local_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Box>
              <Typography variant="h6" component="span">
                {"Details: "}
              </Typography>
              <Typography component="span">{place?.description}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default Place;

{
  /* <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Place Name"}
              </Typography>
              <Typography component="span">{local?.text}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="span">
                {"Address: "}
              </Typography>
              <Typography component="span">
                {local?.place_name}
              </Typography>
               <Rating
                name="place-ratings"
                defaultValue={place.rating}
                precision={1}
                emptyIcon={<StarBorder />}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Details "}
              </Typography>
              <Typography component="span">{local.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Address: "}
              </Typography>
              <Typography component="span">{local.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {"Details: "}
            </Typography>
            <Typography component="span">{place.description}</Typography>
          </Stack>
        </Stack> */
}
