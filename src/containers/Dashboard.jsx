import React from "react";
import { connect } from "react-redux";
import { Container } from "@mui/material";
import { Switch } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useHistory } from "react-router-dom";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import colors from "../assets/styles/colors";

function Dashboard(props) {
  const { children, user } = props;
  const history = useHistory();

  if (user === null) {
    history.push("/");
    window.location.reload();
  }

  return (
    <>
      <Appbar />
      <Container maxWidth="false">
        <Switch>{children}</Switch>
      </Container>
      <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: colors.primary,
          "&:hover": {
            backgroundColor: colors.secondary,
          },
        }}
        aria-label="add"
      >
        <AddIcon
          sx={{
            color: colors.secondary,
            "&:hover": { color: colors.primary },
          }}
        />
      </Fab>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
