import { Paper, Typography, Box, Checkbox } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function CheckoutAddress({
  addressList,
  userBackend,
  selectAddress,
  setSelectAddress
}: any) {
  return (
    <Paper
      sx={{
        marginTop: "1rem",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "700",
        }}
      >
        Địa chỉ giao hàng
      </Typography>
      {addressList !== undefined ? addressList.map((userAddress: any, key: any) => (
        <div
          style={{
            marginTop: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: "69px",
          }}
          key={key}
        >
          <div>
            <div
            
            >
              <Typography
                sx={{

                  padding: "0rem 1rem 0rem 0rem",
                  fontWeight: "500",

                }}
              >
                {userBackend.phoneNumber}
              </Typography>
              <Typography
                sx={{
                  padding: "0rem 1rem 0rem 0rem",
                  fontWeight: "600",
                }}
              >
                {userBackend.userName}
              </Typography>
            </div>
            <Typography
              sx={{
                color: "gray",
              }}
            >
              {userAddress.address}
            </Typography>
          </div>
          <Box flexGrow={1}></Box>
          <Checkbox
            color="success"
            checked={
              selectAddress !== null
                ? selectAddress.addressId === userAddress.addressId
                  ? true
                  : false
                : false
            }
            onChange={(event, checked) => {
              if (checked === true) {
                setSelectAddress(userAddress);
              } else {
                setSelectAddress(null);
              }
            }}
          />
        </div>
      )) : null}
    </Paper>
  );
}
