import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import TaskCard from "../../components/TaskCard";
import axios from "../../api";

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
    await axios.post(`/tasks`, { id_usuarios: id }).then((res) => {
      setTasks(res.data.task);
    });
  };

  const setOpenTask = () => {};

  return (
    <>
      <h1>Tareas de usuario</h1>
      <div style={useStylesMUI.task}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard key={`document${index}`} open={setOpenTask} task={task} />
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
