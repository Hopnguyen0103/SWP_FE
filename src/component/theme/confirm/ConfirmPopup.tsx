import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
export default function ConfirmPopup({
  openConfirmPopup,
  setOpenConfirmPopup,
  func,
  ...props
}: any) {

  return (
    <Dialog
      open={openConfirmPopup}
      maxWidth="xs"
      onClose={() => {
      }}
    >
      <DialogTitle>Bạn có chắc muốn xóa?</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="secondary"
          onClick={() => {
            setOpenConfirmPopup(false)
          }}
        >
          Hủy
        </Button>
        <Button
          color="error"
          onClick={() => {
            func({...props})
            setOpenConfirmPopup(false)
          }}
        >
          Xác nhận
        </Button>
      </DialogContent>
    </Dialog>
  );
}
