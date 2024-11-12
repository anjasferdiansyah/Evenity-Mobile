// VendorList.js
import {FlatList, Text, View} from "react-native";
import tailwind from "twrnc";
import ListChooseVendor from "@/components/ListChooseVendor-user";

const VendorList = ({vendors, onVendorPress, lockedVendors, setLockedVendors}) => {
    const renderItem = ({item}) => (
        <ListChooseVendor
            item={item}
            onVendorPress={onVendorPress}
            lockedVendors={lockedVendors}
            setLockedVendors={setLockedVendors}
        />
    );

    const ListEmptyComponent = () => (
        <View style={tailwind`flex-1 items-center justify-center p-4`}>
            <Text style={tailwind`text-center text-gray-500`}>
                No recommended vendors available.
            </Text>
        </View>
    );

    return (
        <FlatList
            data={vendors}
            renderItem={renderItem}
            keyExtractor={(item) => item.productId}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={tailwind`pb-4`}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default VendorList;