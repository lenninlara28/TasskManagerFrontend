import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import colors from "../assets/styles/colors";
import checkPassword from "../utils/checkPassword";
import axios from "../api";
import { logoutRequest } from "../actions";

import {
  Grid,
  FormControl,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";

function Login(props) {
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    secondSurname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const singupButton = useRef();
  const [validate, setValidate] = useState({ password: { error: false } });
  const { user, history } = props;

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

  const handleInput = (event) => {
    if (event.target.name === "password") {
      if (event.target.value === "" || checkPassword(event.target.value)) {
        singupButton.current.disabled = false;
        setValidate({ ...validate, password: { error: false } });
        Swal.close();
      } else {
        singupButton.current.disabled = true;
        setValidate({
          ...validate,
          password: {
            error: true,
          },
        });
        !validate.password.error &&
          Swal.mixin({
            toast: true,
            position: "bottom-start",
          }).fire({
            icon: "error",
            title:
              "La contraseña debe tener mínimo entre 8 y 15 caracteres,\n una letra minúscula, una mayúscula, un número y un carácter especial.",
          });
      }
    }

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirmation) {
      return Swal.fire({
        icon: "info",
        text: "Las contraseñas ingresadas no coinciden",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setLoading(true);
    axios({
      url: `/users/sign-up`,
      method: "post",
      data: {
        primer_nombre: form.firstName,
        segundo_nombre: form.secondName,
        primer_apellido: form.lastName,
        segundo_apellido: form.secondSurname,
        correo: form.email,
        password: form.password,
      },
    })
      .then((res) => {
        setLoading(false);
        const { data } = res;
        if (data) {
          Swal.fire({
            icon: "success",
            text: "Se ha registrado exitosamente.",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            props.history.push("/sign-in");
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          text: "Ya existe una cuenta con este correo",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div style={{ ...useStylesMUI.container }}>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "40px", marginTop: 0 }}>
          Registro de usuario
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  label="Primer nombre"
                  name="firstName"
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
                  value={form.firstName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  label="Segundo nombre"
                  name="secondName"
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
                  value={form.secondName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  label="Primer apellido"
                  name="lastName"
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
                  value={form.lastName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  label="Segundo apellido"
                  name="secondSurname"
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
                  value={form.secondSurname}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  label="Correo electónico"
                  name="email"
                  type="email"
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
                  value={form.email}
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
                  error={validate.password.error}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                {validate.password.error && (
                  <span style={{ ...useStylesMUI.text_password_error }}>
                    {validate.password.message}
                  </span>
                )}
                <TextField
                  required
                  label="Confirme la contraseña"
                  name="passwordConfirmation"
                  type="password"
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
          <div>
            <Button
              ref={singupButton}
              variant="contained"
              size="small"
              sx={useStylesMUI.button}
              type="submit"
            >
              Registrase
            </Button>
            <br />
            <span>
              ¿Ya tienes una cuenta? &nbsp;
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.history.push("/sign-in");
                }}
              >
                Inicia sesión aquí.
              </span>
            </span>
          </div>
        </form>
      </div>
      <Backdrop sx={useStylesMUI.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const useStylesMUI = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2px 10px",
  },
  root: {
    marginTop: "2em",
  },
  button: {
    margin: "0.5em",
    color: "white",
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: "9px 40px",
    width: "95%",
    "&:hover": {
      color: "black",
      backgroundColor: colors.secondary,
    },
  },
  backdrop: {
    zIndex: 3000,
    color: "#fff",
  },
  text_password_error: {
    marginBottom: "5px",
    color: "#f4443b",
    fontSize: "0.9em",
    maxWidth: "fit-content",
    textAlign: "justify",
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = { logoutRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
