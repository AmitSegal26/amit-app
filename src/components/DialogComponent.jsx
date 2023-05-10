import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { Fragment } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AlertDialog = ({
  id,
  isForDeleting,
  onBtnChangeBizNumberClick,
  buttonText,
  questionHead,
  questionBody,
  acceptText,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAcceptBtn = (ev) => {
    onBtnChangeBizNumberClick(ev);
    setOpen(false);
  };

  return (
    <div>
      {isForDeleting ? (
        <Fragment>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Button
              style={{ width: "10vw" }}
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              {buttonText}
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <Button
              style={{ width: "10vw" }}
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              <DeleteForeverIcon />
            </Button>
          </Box>
        </Fragment>
      ) : (
        <Button color="success" onClick={handleClickOpen}>
          <EditIcon sx={{ ml: 1 }} color="warning" />
          {buttonText}
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{questionHead}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {questionBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button id={id} onClick={handleAcceptBtn} autoFocus>
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  openOrNot: false,
  isForDeleting: false,
  id: "",
};

export default AlertDialog;
