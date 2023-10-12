import React, { useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { priceList } from "@/config/setup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { UserContext } from "../auth/AuthContext";
import { Category } from "../../../package/model/category";
export default function ProductFilter({
  categoryNumber,
  setCategoryNumber,
  priceNumber,
  setPriceNumber,
  statusNumber,
  setStatusNumber,
}: any) {
  const { setOpenLoading } = useContext(UserContext)
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [productStatus, setProductStatus] = useState<any>([])
  useEffect(() => {
    const getCategoryList = async () => {
      setOpenLoading(true)
      const data = await fetch("http://localhost:8080/api/category/allCategory")
      const categoryList = await data.json()
      setCategoryList(categoryList)
      setOpenLoading(false)
    }
    const getProductStatus = async () => {
      const data = await fetch("http://localhost:8080/api/product/allProductStatus")
      const productStatus = await data.json()
      setProductStatus(productStatus)
    }
    getProductStatus()
    getCategoryList()
  }, [])
  return (
    <Paper>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Danh mục
        </Typography>
        {categoryList.map((item: any, key: any) => (
          <FormControlLabel
            control={
              <Checkbox checked={categoryNumber === item.categoryId ? true : false} />
            }
            label={item.categoryName}
            key={item.categoryId}
            sx={{
              width: "100%",
              paddingLeft: "1rem",
            }}
            value={categoryNumber === item.categoryId ? true : false}
            onChange={(_, value) => {
              value === true ? setCategoryNumber(item.categoryId) : setCategoryNumber(-1);
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Giá tiền
        </Typography>
        {priceList.map((item: any, key: any) => (
          <FormControlLabel
            control={<Checkbox checked={priceNumber === key ? true : false} />}
            label={item.name}
            key={key}
            sx={{
              width: "100%",
              paddingLeft: "1rem",
            }}
            value={priceNumber === key ? true : false}
            onChange={(_, value) => {
              value === true ? setPriceNumber(item.id) : setPriceNumber(-1);
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Trạng thái
        </Typography>
        {productStatus !== undefined ? productStatus.filter((item: any) => item.statusId !== 0 && item.statusId !== 4 && item.statusId !== 3).map((item: any) => (
          <FormControlLabel
            control={<Checkbox checked={statusNumber === item.statusId ? true : false} />}
            label={item.status}
            key={item.statusId}
            sx={{
              width: "100%",
              paddingLeft: "1rem",
            }}
            value={statusNumber === item.statusId ? true : false}
            onChange={(_, value) => {
              value === true ? setStatusNumber(item.statusId) : setStatusNumber(-1);
            }}
          />
        )) : null}
      </div>
    </Paper>
  );
}
