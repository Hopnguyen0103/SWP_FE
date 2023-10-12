import React, { useEffect, useState } from "react";
import ProductTable from "@/component/admin-component/product/ProductTable";

import { getProductListApi } from "@/pages/api/ProductApi";
import { useAppSelector } from "@/feature/Hooks";
import AdminLayout from "@/component/admin-component/AdminLayout";
import { Dialog } from "@mui/material";
export default function Product() {
  const [productList, setProductList] = useState(null)
  const [categoryList, setCategoryList] = useState(null)
  const [productStatusList, setProductStatusList] = useState(null)
  const alert = useAppSelector(state => state.alert)
  useEffect(() => {
    const getProductList = async () => {
      const productList = await getProductListApi()
      setProductList(productList.reverse())
    }
    const getCategoryList = async () => {
      const data = await fetch("http://localhost:8080/api/category/allCategory")
      const categoryList = await data.json()
      setCategoryList(categoryList)
    }
    const getProductStatusList = async () => {
      const data = await fetch("http://localhost:8080/api/product/allProductStatus")
      const productStatusList = await data.json()
      setProductStatusList(productStatusList)
    }
    getCategoryList()
    getProductList()
    getProductStatusList()
  }, [alert])
  return (
    <AdminLayout>
      {productList !== null && categoryList !== null && productStatusList !== null ? <ProductTable productList={productList} categoryList={categoryList} productStatusList={productStatusList} /> : <Dialog open={true} />}
    </AdminLayout>
  );
}
