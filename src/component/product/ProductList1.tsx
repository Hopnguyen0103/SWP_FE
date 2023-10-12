import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import NavLink1 from "../theme/navLink/NavLink1";
import Title1 from "../theme/title/Title1";
import { StyledButton } from "../theme/button/StyledButton";
import { useRouter } from "next/router";
import { Product } from "../../../package/model/product";

export default function ProductList1({ categoryAndProduct, number }: any) {
  const router = useRouter();
  return (
    <>
      <Title1 title={categoryAndProduct.categoryName.toUpperCase()}></Title1>
      <Grid container spacing={2}>
        {categoryAndProduct.productList
          .filter((product: Product) => product.status !== 4).slice(0, number)
          .map((product: any, key: any) => (
            <Grid item xs={12 / number} key={key}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "1rem"
      }}>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => {
            router.push(`/category/${categoryAndProduct.categoryId}`);
          }}
        >
          Xem thêm
        </StyledButton>
      </div>
    </>
  );
}
