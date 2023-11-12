import AdminLayout from '@/component/admin-component/AdminLayout'


import FeedbackTable from "@/component/admin-component/feedback/FeedbackTable";
import { useAppSelector } from "@/feature/Hooks";
import { getFeedbackListApi } from "@/pages/api/feedback";
import React, { useEffect, useState } from 'react'


import { Dialog } from "@mui/material";
export default function Product() {
    const [feedbackList, setFeedbackList] = useState(null)
    const alert = useAppSelector(state => state.alert)
    useEffect(() => {
        const getFeedbackList =async () => {
            const feedbackList = await getFeedbackListApi()
            setFeedbackList(feedbackList.reverse())
        }
        getFeedbackList()
    }, [alert])
  return (
    <AdminLayout>
      {feedbackList !== null ? <FeedbackTable feedbackList={feedbackList} /> : <Dialog open={true}/>}
    </AdminLayout>
  );
}

