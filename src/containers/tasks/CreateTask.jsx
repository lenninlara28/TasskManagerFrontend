import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "../../api";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import colors from "../../assets/styles/colors";
import Swal from "sweetalert2";
import { decrypt } from "../../utils/crypt";

function CreateTask(props) {
  const { user } = props;
  const [form, setForm] = useState({ titulo: "", descripcion: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) props.history.push("/sign-in");
    if (props.match.params.id) {
      getTask();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTask = async () => {
    const id = decrypt(props.match.params.id);

    const response = await axios.get(`/tasks/${id}`);
    if (response.status === 200) {
      setForm({
        titulo: response.data.task.titulo,
        descripcion: response.data.task.descripcion,
      });
    }

    try {
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (props.match.params.id) {
        const id = decrypt(props.match.params.id);
        const response = await axios.patch(`/tasks/${id}"`, {
          ...form,
          id_usuarios: user.data_user.id,
        });
        if (response.status === 200) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            text: "Tarea actualizada con éxito",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            props.history.push("/dashboard");
          });
        }
      } else {
        const response = await axios.post("/tasks/new", {
          ...form,
          id_usuarios: user.data_user.id,
        });
        if (response.status === 201) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            text: "Tareas Creada con éxito",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            props.history.push("/dashboard");
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        text: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <h1 style={useStylesMUI.title}>Nueva tarea</h1>
      <div style={useStylesMUI.contentGrid}>
        <form onSubmit={handleSubmit}>
          <Grid
            spacing={2}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  label="Título"
                  name="titulo"
                  variant="outlined"
                  onChange={handleInput}
                  value={form.titulo}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextareaAutosize
                  required
                  name="descripcion"
                  onChange={handleInput}
                  value={form.descripcion}
                  aria-label="minimum height"
                  minRows={5}
                  placeholder="Descripción de la tarea"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <Button
                  sx={useStylesMUI.buttons}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {props.match.params.id ? "Actualizar" : "Crear"}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <Button
                  sx={useStylesMUI.buttons}
                  variant="contained"
                  color="primary"
                  onClick={() => props.history.push("/dashboard")}
                >
                  Cancelar
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </div>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

const useStylesMUI = {
  buttons: {
    borderRadius: "5px",
    backgroundColor: colors.primary,
    color: colors.secondary,
    "&:hover": {
      backgroundColor: colors.secondary,
      color: colors.primary,
    },
  },
  contentGrid: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginTop: "5rem",
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(CreateTask);
