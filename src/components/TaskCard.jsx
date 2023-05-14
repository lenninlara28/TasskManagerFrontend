import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import image_tasks from "../assets/img/task_image.png";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useHistory } from "react-router-dom";
import { encrypt } from "../utils/crypt";

function TaskCard(props) {
  const { task, deleteTask } = props;
  const history = useHistory();

  return (
    <Card sx={{ width: 250, margin: "2rem" }}>
      <CardMedia sx={{ height: 140 }} image={image_tasks} title="Tasks" />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {task?.titulo.slice(0, 13)}...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task?.descripcion.slice(0, 23)}...
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Ver">
          <IconButton>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            onClick={() => history.push(`/edit-task/${encrypt(task.id)}`)}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton onClick={() => deleteTask(task.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
