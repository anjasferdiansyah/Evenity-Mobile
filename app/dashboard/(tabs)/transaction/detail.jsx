import React from 'react'
import {useSelector} from "react-redux";
import OrderDetailUser from "@/components/dashboard/transaction/detail/user";
import OrderDetailVendor from "@/components/dashboard/transaction/detail/vendor";

const HistoryOrderDetailScreen = () => {
    const {user} = useSelector(state => state.auth)
    const role = user?.role

    if (role === "ROLE_CUSTOMER") {
        return <OrderDetailUser/>
    } else return <OrderDetailVendor/>
}

export default HistoryOrderDetailScreen