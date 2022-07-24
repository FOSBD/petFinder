import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { StarBorder } from "@mui/icons-material";

const Places = () => {
  const {
    state: { places },
    dispatch,
  } = useValue();
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {places.map((place) => (
          <Card key={place._id}>
            <ImageListItem sx={{ height: "100% !important" }}>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                }}
                title={place.title}
                actionIcon={
                  <Tooltip title={place.uName} sx={{ mr: "5px" }}>
                    <Avatar src={place.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={place.images[0]}
                alt={place.title}
                loading="lazy"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch({ type: "UPDATE_PLACE", payload: place })
                }
              />
              <ImageListItemBar
                title={"Rating"}
                actionIcon={
                  <Rating
                    sx={{ color: "rgba(255,255,255, 0.8)", mr: "5px" }}
                    name="place-rating"
                    defaultValue={place.rating}
                    precision={1}
                    emptyIcon={
                      <StarBorder sx={{ color: "rgba(255,255,255, 0.8)" }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Places;
