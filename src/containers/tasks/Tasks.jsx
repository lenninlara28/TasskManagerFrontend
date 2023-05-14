import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import TaskCard from "../../components/TaskCard";
import axios from "../../api";
import Swal from "sweetalert2";
import colors from "../../assets/styles/colors";

function Tasks(props) {
  const { user } = props;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      getTasksUser(user.data_user?.id);
    }
    // eslint-disable-next-line
  }, []);

  const getTasksUser = async (id) => {
    await axios.post(`/tasks`, { id_usuarios: id, estado: 1 }).then((res) => {
      setTasks(res.data.task);
    });
  };

  const setOpenTask = () => {};

  const deleteTask = async (id) => {
    Swal.fire({
      text: "¿Está seguro que desea eliminar esta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: colors.primary,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`/tasks/${id}"`);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Tarea eliminada con éxito",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
          });
        }
      }
    });
  };

  return (
    <>
      <h1>Tareas de usuario</h1>
      <div style={useStylesMUI.task}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard
              key={`${index}`}
              open={setOpenTask}
              deleteTask={deleteTask}
              task={task}
            />
          ))
        ) : (
          <h3>Aún no tienes tareas</h3>
        )}
      </div>
    </>
  );
}

const useStylesMUI = {
  task: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    margin: "1px 30px 0px 30px",
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Tasks);
