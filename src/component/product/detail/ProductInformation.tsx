import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import FeedbackTable from "@/component/product/detail/FeedbackList";
import { getFeedbackListByProductIdApi, getUserByUserUidApi } from "@/pages/api/feedback";
import { useAppSelector } from "@/feature/Hooks";
import { Dialog } from "@mui/material";
import { Product } from "../../../../package/model/product";
import FeedbackCreateForm from './FeedbackCreate';
import { auth } from "@/config/firebase";
import { User } from '../../../../package/model/user';

const StyledTab = styled(Tab)({
        color: "black"
        fontWeight: 1050,

});
export default function ProductInformation({ product }: {product: Product}) {
  const [user, setUser] = useState<User | null>(null)
  const [value, setValue] = React.useState("1");
  const [feedbackList, setFeedbackList] = useState(null)
  const uid = auth.currentUser?.uid
  useEffect(() => {
      const getUser = async () => {
          const user = await getUserByUserUidApi(uid)
          setUser(user)
      }
      getUser()
  }, [uid])
  
  const alert = useAppSelector(state => state.alert)
    useEffect(() => {
        const getFeedbackList = async () => {
            const feedbackList = await getFeedbackListByProductIdApi(product.productId)
            setFeedbackList(feedbackList.reverse())
        }
        getFeedbackList()
    }, [alert])
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box marginTop={6}>
        <TabList onChange={handleChange}>
        <StyledTab label="Đánh giá" value="2" />
          <StyledTab label="Chi tiết" value="1" />
        </TabList>
      </Box>
      <TabPanel value="1">.</TabPanel>
      <TabPanel value="2">
        {feedbackList !== null ? <FeedbackTable feedbackList={feedbackList} /> : <Dialog open={true}/>}

        {user != undefined || user != null? <FeedbackCreateForm userId={user?.userId} productId={product.productId}/> : <p style={{color: "red"}}>* Cần đăng nhập đề gửi đánh giá về các sản phẩm cho admin</p>}

        {user != undefined || user != null? <FeedbackCreateForm userId={user?.userId} productId={product.productId}/> : <p style={{color: "white"}}>* Cần đăng nhập đề gửi đánh giá về các sản phẩm</p>}

      </TabPanel>
    </TabContext>
  );
}
