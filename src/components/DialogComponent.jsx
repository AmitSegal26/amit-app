import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

const AlertDialog = ({ onBtnChangeBizNumberClick, openOrNot }) => {
  const [open, setOpen] = React.useState(openOrNot);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAcceptBtn = () => {
    onBtnChangeBizNumberClick();
    setOpen(false);
  };

  return (
    <div>
      <Button color="success" onClick={handleClickOpen}>
        <EditIcon sx={{ ml: 1 }} color="warning" />
        Edit The Business Number
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to change the BIZNUMBER of this card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changing the Business Number of this card is permanent. After
            Clicking 'accept' the previous Business Number will be lost forever
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAcceptBtn} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  openOrNot: false,
};

export default AlertDialog;
