import React from "react";
import {useSelector} from "react-redux";
import {OrderHistoryVendor} from "@/components/dashboard/transaction/vendor";
import OrderHistoryUser from "@/components/dashboard/transaction/user";
import {ROLE as ROLES} from "@/constant/USER";
// import moment from "moment";


export default function HistoryOrderScreen() {

    const {user} = useSelector(state => state.auth)
    const role = user?.role
    if (role !== ROLES.CUSTOMER) {
        return <OrderHistoryVendor/>
        
    } else return <OrderHistoryUser/>
}