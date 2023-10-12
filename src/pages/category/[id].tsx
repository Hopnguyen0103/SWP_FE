import Layout1 from "@/component/theme/layout/Layout1";
import { GetServerSidePropsContext } from "next";
import React from "react";

import ProductList2 from "@/component/product/ProductList2";
import Title1 from "@/component/theme/title/Title1";
import { Product } from "../../../package/model/product";
import { UseGetProductCategory } from "../../../package/function/product/use-get-category";
import { ResponseBody } from "../../../package/model/api";
import { Category } from "../../../package/model/category";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const id = params?.id;
  if (id !== undefined && !Array.isArray(id)) {
    const response : ResponseBody<Product[]> = await UseGetProductCategory({
      categoryId: Number.parseInt(id, 10)
    });
    const data = await fetch("http://localhost:8080/api/category/allCategory")
    const categoryList : Category[] = await data.json()
    const category = categoryList.find(
      (item) => Number.parseInt(id) === item.categoryId
    );
    const productList = response.data;
    return {
      props: {
        productList: productList ? productList : [],
        title: category?.categoryName,
      },
    };
  }
}
export default function Category({
  productList,
  title,
}: {
  productList: Product[];
  title: string;
}) {
  return (
    <Layout1>
      <Title1 title={title.toUpperCase()} />
      <ProductList2 productList={productList} row={3} col={4} />
    </Layout1>
  );
}
