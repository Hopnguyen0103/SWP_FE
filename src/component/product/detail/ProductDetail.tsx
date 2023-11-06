import React, { useContext, useState } from "react";
import { setup } from "@/config/setup";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import StyledLoadingButton from "@/component/theme/button/StyledLoadingButton";
import { StyledTypography } from "@/component/theme/text/Typography";
import { UserContext } from "@/component/auth/AuthContext";
import { auth } from "@/config/firebase";
import { UseAddToCart } from "../../../../package/function/cart/use-add-cartItem";
import { ResponseBody } from "../../../../package/model/api";
import { CartAndCartItemAndProduct } from "../../../../package/model/cart/cart-and-cartItem-and-product";
const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};
export default function ProductDetail({ product }: any) {

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { cart } = React.useContext(UserContext)
  const handleAddtoCart = async () => {
    if (auth.currentUser === null) {
      dispatch(
        setOpen({
          severity: "error",
          open: true,

          message: "Hãy đăng nhập để thêm vào giỏ hàng nhé!",
          severity: "error",

        })
      );
    } else {
      try {
        setIsLoading(true)

        const response : ResponseBody<CartAndCartItemAndProduct> = await UseAddToCart({
          auth: auth.currentUser?.uid
          productId: product?.productId,
          cartId: cart?.cart.cartId,
        })
        dispatch(
          setOpen({
            open: true,
            severity: response.status,
            message: response.message,
          })
        );
      } catch (error: any) {
        dispatch(
          setOpen({
            open: true,
            message: error.message,
            severity: "error",
          })
        )
      } finally {
        setIsLoading(false)
      }
    }
  };


  return (
    <>
      <StyledTypography
        style={
          {
            fontSize: "3rem",
          }
        }
      >
        {product.productName}
      </StyledTypography>
      <div
        style={{
          margin: "2rem 1rem",
        }}
      >
        <StyledTypography variant="h6" sx={{
          color: "#e10405",
        }}>{formatNumber(product.price)} VND </StyledTypography>
        <StyledTypography
          variant="h6"
          sx={{
            color: product.quantity > 0 ? setup.success : setup.error,
          }}
        >
          Số lượng: {product.quantity}
        </StyledTypography>
      </div>
      <StyledTypography variant="body1" >{product.description}</StyledTypography>
      <StyledTypography variant="body1" >Tình trạng: {product.status}</StyledTypography>
      <StyledTypography variant="body1" >Thông tin: </StyledTypography>
      </div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "3rem",

        }}
      >
        <StyledLoadingButton
          variant="contained"
          loading={isLoading}
          disabled={product.quantity > 0 ? false : true}
          onClick={() => handleAddtoCart()}
          sx={{
            "&:hover": {
              backgroundColor:
                product.quantity > 0
                  ? `${setup.success} !important`
                  : setup.error,
            },
            backgroundColor: product.quantity > 0 ? setup.success : setup.error,
            color: "white",
          }}
        >
          {product.quantity > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
        </StyledLoadingButton>
      </div>
    </>
  );
}
