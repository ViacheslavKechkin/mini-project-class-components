import React from "react";

import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  ".MuiTypography-root": {
    padding: 15,
  },
}));

const DeletionNotification = ({
  isConfirmationDelete,
  productDelete,
  onHandleDeleteWindow,
  onHandleDeleteProduct,
}) => (
  <BootstrapDialog
    className="delete-wrapper"
    aria-labelledby="customized-dialog-title"
    open={isConfirmationDelete}
  >
    <Typography id="customized-dialog-title">Подтвердите удаление</Typography>
    <DialogContent dividers>
      <Typography className="delete-question" gutterBottom>
        Вы действительно хотите удалить данный товар из корзины ?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onHandleDeleteWindow(false)} className="button">
        Закрыть
      </Button>
      <Button
        onClick={() => onHandleDeleteProduct(false, productDelete)}
        className="button"
      >
        Удалить
      </Button>
    </DialogActions>
  </BootstrapDialog>
);

export default DeletionNotification;
