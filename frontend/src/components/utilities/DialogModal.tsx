import "./dialogModal.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface DialogModalProps {
  dialogText: string;
  dialogTitle: string
}

export default function DialogModal({ dialogText, dialogTitle }: DialogModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="playstackPrimaryPaging"
        size="small"
        startIcon={<OpenInNewIcon />}
        sx={{ fontSize: "var(--font-size-xs)" }}
        onClick={handleClickOpen}
      >
        Show Full Description
      </Button>
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent sx={{ backgroundColor: "var(--color-background)" }}>
          <DialogTitle sx={{ color: "var(--color-text-modal)"}}>
            {dialogTitle}
          </DialogTitle>
          <DialogContentText
            sx={{ color: "var(--color-text-modal)" }}
            dangerouslySetInnerHTML={{ __html: dialogText }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
