import React from "react";
import {useSelector} from "react-redux";
import {OrderHistoryVendor} from "@/components/dashboard/transaction/vendor";
import OrderHistoryUser from "@/components/dashboard/transaction/user";
// import moment from "moment";


const HistoryOrderScreen = () => {

    const {user} = useSelector(state => state.auth)
    const role = user?.role
    if (role !== "ROLE_CUSTOMER") {
        return <OrderHistoryVendor/>
    } else return <OrderHistoryUser/>
}
export default HistoryOrderScreen;