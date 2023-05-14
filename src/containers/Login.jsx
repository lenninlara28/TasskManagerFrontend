import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import colors from "../assets/styles/colors";
import { login, setError, logoutRequest } from "../actions";
import Swal from "sweetalert2";
import axios from "../api";
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";

function Login(props) {
  const [form, setForm] = useState({ correo: "" });
  const { error, setError, user, history, logoutRequest } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      valida();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valida = async () => {
    await axios
      .get(`/users/${user?.data_user?.id}`)
      .then((res) => {
        setLoading(false);
        history.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        logoutRequest();
        window.location.reload();
      });
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario incorrecto",
        confirmButtonColor: colors.primary,
      }).then(() => {
        setError(null);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    props.login(form, "/dashboard");
  };

  return (
    <div style={{ ...useStylesMUI.container }}>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  label="example@email.com"
                  name="correo"
                  variant="outlined"
                  onChange={handleInput}
                  value={form.correo}
                  InputProps={{
                    classes: {
                      root: { borderRadius: "20px" },
                      notchedOutline: {
                        borderWidth: 2,
                        borderColor: colors.primary,
                      },
                      focused: { borderColor: colors.primary },
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  label="Contraseña"
                  name="password"
                  type="password"
                  autoComplete="on"
                  variant="outlined"
                  onChange={handleInput}
                  InputProps={{
                    classes: {
                      root: { borderRadius: "20px" },
                      notchedOutline: {
                        borderWidth: 2,
                        borderColor: colors.primary,
                      },
                      focused: { borderColor: colors.primary },
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ ...useStylesMUI.classes__login_buttons }}>
            <Button
              variant="contained"
              size="small"
              sx={useStylesMUI.button}
              type="submit"
            >
              Ingresar
            </Button>
            <div>
              <p
                onClick={() => {
                  history.push("/sign-up");
                }}
                style={{ ...useStylesMUI.classes__login_buttons_paragraph }}
              >
                Registrarse
              </p>
            </div>
          </div>
        </form>
      </div>
      <Backdrop sx={useStylesMUI.backdrop} open={loading || false}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const useStylesMUI = {
  container: {
    display: "flex",
    minHeight: "80vh",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 10px",
  },
  classes__login_buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "2em",
  },
  classes__login_buttons_paragraph: {
    marginBottom: 0,
    color: colors.primary,
    textAlign: "initial",
    cursor: "pointer",
    textDecoration: "underline",
  },
  button: {
    margin: "0.5em",
    color: "white",
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: "9px 40px",
    "&:hover": {
      color: "black",
      backgroundColor: colors.secondary,
    },
  },
  backdrop: {
    zIndex: 3000,
    color: "#fff",
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    error: state.error,
  };
};

const mapDispatchToProps = {
  login,
  setError,
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
