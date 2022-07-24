import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

import StarOutlineIcon from "@mui/icons-material/StarOutline";

const AddDetails = () => {
  const {
    state: {
      details: { title, description, rating },
    },
    dispatch,
  } = useValue();
  const [ratingRank, setRatingRank] = useState(rating ? 1 : 0);
  const handleRatingRankChange = (e) => {
    const rating = Number(e.target.value);
    setRatingRank(rating);
    if (rating === 0) {
      dispatch({ type: "UPDATE_DETAILS", payload: { rating: 0 } });
    } else {
      dispatch({ type: "UPDATE_DETAILS", payload: { rating: 1 } });
    }
  };
  const handleRatingChange = (e) => {
    dispatch({ type: "UPDATE_DETAILS", payload: { rating: e.target.value } });
  };
  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup
          name="ratingRank"
          value={ratingRank}
          row
          onChange={handleRatingRankChange}
        >
          <FormControlLabel value={0} control={<Radio />} label="No Rating" />
          <FormControlLabel value={1} control={<Radio />} label="Your Rating" />
          {Boolean(rating) && (
            <TextField
              sx={{ width: "9ch !important" }}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarOutlineIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{ type: "number", min: 1, max: 5 }}
              value={rating}
              onChange={handleRatingChange}
              name="rating"
            />
          )}
        </RadioGroup>
      </FormControl>
      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;

// Componente com os campos a prencher para criar os detalhes nos Places inseridos
