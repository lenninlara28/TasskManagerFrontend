import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import colors from "../assets/styles/colors";
import { logoutRequest } from "../actions";

const Appbar = (props) => {
  const { user, logoutRequest } = props;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toLink = (ruta) => {
    let enlace = document.createElement("a");
    enlace.href = ruta;
    enlace.click();
  };

  const handleSesion = () => {
    setAnchorEl(false);
    Swal.fire({
      customClass: {
        container: useStylesMUI.mySwal,
      },
      text: "¿Está seguro que desea salir?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: colors.primary,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        logoutRequest();
        history.push("/");
      }
    });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div style={useStylesMUI.container__profile}>
        <Avatar
          src={user?.data_user?.linkPhoto}
          sx={useStylesMUI.container__avatar}
        />
        <div style={useStylesMUI.container__welcome}>
          <p style={useStylesMUI.container__welcome_message}>Bienvenido</p>
          <p
            style={useStylesMUI.container__welcome_name}
          >{`${user?.data_user?.primer_nombre} ${user?.data_user?.primer_apellido}`}</p>
        </div>
      </div>
      <Divider />
      <MenuItem
        sx={useStylesMUI.textMenu}
        onClick={(e) => toLink("/dashboard")}
      >
        <DashboardOutlined sx={iconStyle} />
        Inicio
      </MenuItem>
      <Divider />
      <MenuItem sx={useStylesMUI.textMenu} onClick={handleSesion}>
        <ExitToAppOutlined sx={iconStyle} />
        Cerrar sesión
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar sx={useStylesMUI.appbar} position="static" elevation={0}>
        <Toolbar sx={useStylesMUI.appbar__toolbar_sectionDesktop}>
          {user ? (
            <>
              <Typography variant="h6" style={{ color: "#ffffff" }}>
                Task Manager
              </Typography>
              <IconButton
                sx={useStylesMUI.accountCircle}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="#000"
              >
                <Avatar />
              </IconButton>
            </>
          ) : (
            <button
              style={useStylesMUI.appbar__toolbar_button_session}
              onClick={() => history.push("/sign-in")}
            >
              Iniciar Sesión
            </button>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

const iconStyle = {
  fontSize: "1em",
  marginRight: ".5em",
};

const useStylesMUI = {
  appbar: {
    backgroundColor: colors.primary,
  },
  menuButton: {
    marginRight: "2px",
  },
  appbar__toolbar_sectionDesktop: {
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-around",
    alignContent: "center",
    right: "2vw",
  },
  appbar__toolbar_button_session: {
    display: "block",
    width: "15em",
    color: colors.secondary,
    border: "2px solid",
    borderRadius: 20,
    background: "transparent",
    fontWeight: "bold",
  },
  icon: {
    fontSize: "1em",
    marginRight: ".5em",
  },
  textMenu: {
    color: colors.primary,
  },
  mySwal: {
    zIndex: 3000,
  },
  accountCircle: {
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  container__profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container__avatar: {
    borderRadius: "100%",
    margin: ".5em",
  },
  container__welcome: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 .5em -1em .5em",
  },
  container__welcome_message: {
    color: colors.primary,
    margin: 0,
  },
  container__welcome_name: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: "1px",
    color: colors.primary,
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
