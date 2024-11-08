import {useSelector} from "react-redux";
import EditProfileCustomer from "@/components/edit-profile/EditProfileCustomer";
import EditProfileVendor from "@/components/edit-profile/EditProfileVendor";

export default function EditScreen() {

    const { id, user} = useSelector((state) => state.auth);
    console.log("user", user)
    if(user?.role === "ROLE_CUSTOMER") {
        return <EditProfileCustomer/>
    } else {
        return <EditProfileVendor/>
    }
}
