import React from "react";

import { styled } from "@mui/material/styles";

import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "./style.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DeleteProduct = ({
  confirmationDelete,
  elementDelete,
  openDeleteWindow,
  deleteProduct,
}) => (
  <BootstrapDialog
    className="delete-wrapper"
    aria-labelledby="customized-dialog-title"
    open={confirmationDelete}
  >
    <Typography id="customized-dialog-title">Подтвердите удаление</Typography>
    <DialogContent dividers>
      <Typography className="delete-question" gutterBottom>
        Вы действительно хотите удалить данный товар из корзины ?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => openDeleteWindow(false)} className="button">
        Закрыть
      </Button>
      <Button
        onClick={() => deleteProduct(false, elementDelete)}
        className="button"
      >
        Удалить
      </Button>
    </DialogActions>
  </BootstrapDialog>
);
export default DeleteProduct;
