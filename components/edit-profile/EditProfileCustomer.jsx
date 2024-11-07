import {FlatList, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {router} from "expo-router";
import {clearProfile, editCustomerProfile, fetchUserProfile,} from "@/redux/slices/profileSlice";
import RNPickerSelect from "react-native-picker-select";

export default function EditProfileCustomer() {
    const provinceData = [
        {label: "JAWA BARAT", value: "32", name: "JAWA BARAT"},
        {label: "JAWA TENGAH", value: "33", name: "JAWA TENGAH"},
        {label: "JAWA TIMUR", value: "35", name: "JAWA TIMUR"},
        {label: "DKI JAKARTA", value: "31", name: "DKI JAKARTA"},
        {label: "D.I YOGYAKARTA", value: "34", name: "D.I YOGYAKARTA"},
    ];

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [citySearchText, setCitySearchText] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    // Location search - City
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [provinceSearchText, setProvinceSearchText] = useState("");
    // Location search - District
    const [districtSearchText, setDistrictSearchText] = useState("");
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]); // ... previous state declarations ...

    // Add loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {userInfo} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    console.log("userInfo", userInfo);

    useEffect(() => {
        if (userInfo) {
            setFullName(userInfo?.detail?.fullName || "");
            setPhoneNumber(userInfo?.detail?.phoneNumber || "");
            setAddress(userInfo?.detail?.address || "");
            setSelectedCityId(userInfo?.detail?.city);
            // setSelectedProvinceId(userInfo?.detail?.province);
            provinceData.forEach((element) => {
                if (element.name === userInfo?.detail?.province.toUpperCase()) {
                    setSelectedProvinceId(element.value);
                    setSelectedProvince(element.value);
                }
            });
            setCitySearchText(userInfo?.detail?.city.toUpperCase() || ""); // assuming cityName is available in userInfo
            setDistrictSearchText(userInfo?.detail?.district.toUpperCase() || ""); // assuming districtName is available in userInfo
        }
    }, [userInfo]);

    useEffect(() => {
        let isMounted = true; // For cleanup
        const fetchCities = async () => {
            // Reset error state
            setError(null);
            setIsLoading(true);

            try {
                if (!selectedProvinceId) return;
                const response = await fetch(
                    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (isMounted) {
                    setAvailableCities(data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(`Error fetching cities: ${error.message}`);
                    console.log("Error fetching cities:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchCities();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [selectedProvinceId]);

    useEffect(() => {
        let isMounted = true;
        const fetchDistricts = async () => {
            setError(null);
            setIsLoading(true);

            try {
                if (!selectedCityId) return;
                const response = await fetch(
                    `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCityId}.json`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (isMounted) {
                    setAvailableDistricts(data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(`Error fetching districts: ${error.message}`);
                    console.log("Error fetching districts:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchDistricts();

        return () => {
            isMounted = false;
        };
    }, [selectedCityId]);

    const handleCitySelection = (selectedCity) => {
        setCitySearchText(selectedCity.name);
        setSelectedCityId(selectedCity.id);
        setFilteredCities([]);
    };

    const handleDistrictSelection = (selectedDistrict) => {
        setDistrictSearchText(selectedDistrict.name);
        setFilteredDistricts([]);
    };

    const handleCitySearch = (text) => {
        const newText = text.trim();

        if (newText.length < citySearchText.length) {
            setCitySearchText("");
            setSelectedCityId(null);
            setDistrictSearchText("");
            return;
        }

        setCitySearchText(newText);

        // Use the newText parameter directly for filtering
        const filtered = availableCities.filter((city) =>
            city.name.toLowerCase().includes(newText.toLowerCase())
        );
        setFilteredCities(newText === "" ? [] : filtered);
    };

    const handleDistrictSearch = (text) => {
        const newText = text.trim();

        if (newText.length < districtSearchText.length) {
            setDistrictSearchText("");
            return;
        }

        setDistrictSearchText(newText);

        // Use the newText parameter directly for filtering
        const filtered = availableDistricts.filter((district) =>
            district.name.toLowerCase().includes(newText.toLowerCase())
        );
        setFilteredDistricts(newText === "" ? [] : filtered);
    };

    const renderCityListItem = ({item}) => (
        <TouchableOpacity
            className="p-5 bg-white border-b border-gray-400 w-full"
            onPress={() => handleCitySelection(item)}
        >
            <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
        </TouchableOpacity>
    );

    const renderDistrictListItem = ({item}) => (
        <TouchableOpacity
            className="p-5 bg-white border-b border-gray-400 w-full"
            onPress={() => handleDistrictSelection(item)}
        >
            <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
        </TouchableOpacity>
    );

    const handleEditProfile = async () => {
        const newRegisterData = {
            fullName,
            phoneNumber,
            province: provinceSearchText,
            city: citySearchText,
            district: districtSearchText,
            address,
        };

        try {
            dispatch(
                editCustomerProfile({
                    updatedCustomerProfile: newRegisterData,
                    id: userInfo?.detail.customerId,
                })
            );
            dispatch(clearProfile());
            dispatch(fetchUserProfile())
            router.back();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full p-10">
                <Text className="text-2xl font-outfitBold w-full">Edit Profile</Text>
                <View className="flex flex-col gap-4 py-safe-or-12">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Full Name</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter name.."
                            onChangeText={(text) => setFullName(text)}
                            value={fullName}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">
                            Phone Number
                        </Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter phone number"
                            onChangeText={(text) => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Address</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter address detail"
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular">Province</Text>
                        <View
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full">
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    setSelectedProvinceId(value);

                                    // Mengatur nama provinsi yang dipilih

                                    const selectedProvince = provinceData.find(
                                        (p) => p.value === value
                                    );

                                    setProvinceSearchText(
                                        selectedProvince ? selectedProvince.name : ""
                                    );
                                }}
                                placeholder={{label: "Select province", value: null}}
                                items={provinceData}
                                value={selectedProvinceId} // Mengisi picker dengan state selectedProvinceId
                            />
                        </View>
                    </View>
                    <View className="flex flex-row gap-2">
                        <View className="flex flex-col gap-2 w-[50%]">
                            <Text
                                className={
                                    selectedProvinceId !== null
                                        ? "font-outfitRegular"
                                        : "font-outfitRegular opacity-50"
                                }
                            >
                                City
                            </Text>
                            <TextInput
                                editable={selectedProvinceId !== null}
                                // className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                className={
                                    selectedProvinceId !== null
                                        ? "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                        : "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full opacity-50"
                                }
                                placeholder="Enter your email.."
                                maxLength={50}
                                onChangeText={handleCitySearch}
                                value={citySearchText}
                            />
                            {filteredCities.length > 0 && (
                                <FlatList
                                    data={filteredCities}
                                    renderItem={renderCityListItem}
                                    keyExtractor={(item) => item.id}
                                    className="absolute z-10 top-20 w-full border-[0.5px] h-fit max-h-[300%] rounded-lg border-gray-400"
                                />
                            )}
                        </View>
                        <View className="flex flex-col gap-2 w-[50%]">
                            <Text
                                className={
                                    selectedCityId !== null
                                        ? "font-outfitRegular"
                                        : "font-outfitRegular opacity-50"
                                }
                            >
                                District
                            </Text>
                            <TextInput
                                // className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                editable={selectedCityId !== null}
                                className={
                                    selectedCityId !== null
                                        ? "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                        : "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full opacity-50"
                                }
                                placeholder="Enter district"
                                onChangeText={handleDistrictSearch}
                                value={districtSearchText}
                            />
                            {filteredDistricts.length > 0 && (
                                <FlatList
                                    data={filteredDistricts}
                                    renderItem={renderDistrictListItem}
                                    keyExtractor={(item) => item.id}
                                    className="absolute z-10 top-20 w-full border-[0.5px] h-fit max-h-[300%] rounded-lg border-gray-400"
                                />
                            )}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleEditProfile}
                        className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full"
                    >
                        <Text className="text-white text-xl font-outfitBold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
