import React from 'react'
import {useSelector} from "react-redux";
import {ROLE} from "@/constant/USER";
import CompletingRegisterVendor from "@/components/auth/completing-register/vendor";
import CompletingRegisterUser from "@/components/auth/completing-register/user";

export default function CompletingRegisterScreen() {
    const {registerAs} = useSelector(state => state.auth)

    if (registerAs === ROLE.VENDOR) {
        return <CompletingRegisterVendor/>
    }
    return <CompletingRegisterUser/>
}
