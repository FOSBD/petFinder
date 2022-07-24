import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/place";

export const createPlace = async (place, currentUser, dispatch, setPage) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: place, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The place has been added successfully",
      },
    });
    dispatch({ type: "RESET_PLACE" });
    setPage(0);
    dispatch({ type: "UPDATE_PLACE", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getPlaces = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_PLACES", payload: result });
  }
};

// Funcao resposavel por criar Places no servidor
