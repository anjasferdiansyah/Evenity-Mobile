import React from 'react'
import {useSelector} from "react-redux";
import OrderDetailUser from "@/components/dashboard/transaction/detail/user";
import OrderDetailVendor from "@/components/dashboard/transaction/detail/vendor";
import {ROLE as ROLES} from "@/constant/USER";

export default function HistoryOrderDetailScreen() {
    const {user} = useSelector(state => state.auth)
    const role = user?.role

    if (role === ROLES.CUSTOMER) {
        return <OrderDetailUser/>
    } else return <OrderDetailVendor/>
}
