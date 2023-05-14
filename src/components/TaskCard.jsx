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

function TaskCard(props) {
  const { task } = props;

  return (
    <Card sx={{ maxWidth: 300, margin: "2rem" }}>
      <CardMedia sx={{ height: 140 }} image={image_tasks} title="Tasks" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task?.descripcion}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Tooltip title="Editar">
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
