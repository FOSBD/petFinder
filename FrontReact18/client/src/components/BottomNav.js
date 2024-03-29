import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { AddLocationAlt, LocationOn } from "@mui/icons-material";
import PetsIcon from "@mui/icons-material/Pets";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useEffect, useRef, useState } from "react";
import ClusterMap from "./map/ClusterMap";
import Places from "./places/Places";
import AddPlace from "./addPlace/AddPlace";
import Protected from "./protected/Protected";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);
  return (
    <Box ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Places />,
          2: (
            <Protected>
              <AddPlace setPage={setValue} />
            </Protected>
          ),
        }[value]
      }
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Map" icon={<LocationOn />} />
          <BottomNavigationAction label="Places" icon={<PetsIcon />} />
          <BottomNavigationAction label="Add" icon={<AddLocationAlt />} />
          <BottomNavigationAction
            target="_blank"
            href="http://localhost:3001/home"
            label="Shop"
            icon={<LocalGroceryStoreIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
