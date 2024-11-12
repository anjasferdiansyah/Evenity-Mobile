// VendorList.js
import {ScrollView, Text} from "react-native";
import tailwind from "twrnc";
import ListChooseVendor from "@/components/ListChooseVendor-user";

const VendorList = ({vendors, onVendorPress, lockedVendors, setLockedVendors}) => {

    return (
        <ScrollView className="vendor-choosen">
            {vendors.length > 0 ? (
                vendors.map((item) => (
                    <ListChooseVendor item={item} onVendorPress={onVendorPress} lockedVendors={lockedVendors}
                        setLockedVendors={setLockedVendors}/>
                ))
            ) : (
                <Text style={tailwind`text-center text-gray-500`}>
                    No recommended vendors available.
                </Text>
            )}
        </ScrollView>
    );
};

export default VendorList;