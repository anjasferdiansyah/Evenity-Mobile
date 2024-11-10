import {FlatList, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {router} from "expo-router";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from "react-native-picker-select";
import {clearProfile, editCustomerProfile, fetchUserProfile} from "@/redux/slices/profileSlice";

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
        const handleEditProfile = async () => {
        const newRegisterData = {
            fullName,
            phoneNumber,
            province: provinceSearchText,
            city: citySearchText,
            district: districtSearchText,
            address,
        };


        Alert.alert(
            "Confirm Update",
            "Are you sure you want to update your profile?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Update cancelled"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            dispatch(
                                editCustomerProfile({
                                    updatedCustomerProfile: newRegisterData,
                                    id: userInfo?.detail.id,
                                })
                            );
                            dispatch(clearProfile());
                            dispatch(fetchUserProfile());
                            router.back();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        );
    };

    const renderInput = (label, value, onChangeText, placeholder, additionalProps = {}) => (
        <View className="mb-4">
            <Text className="text-sm font-outfitRegular text-[#6B7280] mb-2">{label}</Text>
            <TextInput
                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base font-outfitRegular"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                onChangeText={onChangeText}
                value={value}
                {...additionalProps}
            />
        </View>
    )

    const renderCityListItem = ({item}) => (
        <TouchableOpacity
            className="p-4 bg-white border-b border-[#E5E7EB]"
            onPress={() => handleCitySelection(item)}
        >
            <Text className="text-base text-[#1F2937]">{item.name}</Text>
        </TouchableOpacity>
    );

    const renderDistrictListItem = ({item}) => (
        <TouchableOpacity
            className="p-4 bg-white border-b border-[#E5E7EB]"
            onPress={() => handleDistrictSelection(item)}
        >
            <Text className="text-base text-[#1F2937]">{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 px-6 pt-6">
                    {/* Header */}
                    <View className="flex-row items-center mb-6 mt-10">
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            className="mr-4 p-2 rounded-full bg-[#F3F4F6]"
                        >
                            <AntDesignIcons name='arrowleft' size={20} color={'#374151'}/>
                        </TouchableOpacity>
                        <Text className="text-2xl font-outfitBold text-[#111827]">
                            Edit Profile
                        </Text>
                    </View>

                    {/* Content */}
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                    >
                        <View 
                            className="bg-white rounded-2xl p-6 shadow-md"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 2
                            }}
                        >
                            {renderInput(
                                "Full Name", 
                                fullName, 
                                (text) => setFullName(text), 
                                "Enter your full name"
                            )}

                            {renderInput(
                                "Phone Number", 
                                phoneNumber, 
                                (text) => setPhoneNumber(text), 
                                "Enter your phone number"
                            )}

                            {renderInput(
                                "Address", 
                                address, 
                                (text) => setAddress(text), 
                                "Enter your address"
                            )}

                            {/* Province Picker */}
                            <View className="mb-4">
                                <Text className="text-sm font-semibold text-[#6B7280] mb-2">Province</Text>
                                <View className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                                    <RNPickerSelect
                                        onValueChange={(value) => {
                                            setSelectedProvinceId(value);
                                            const selectedProvince = provinceData.find(
                                                (p) => p.value === value
                                            );
                                            setProvinceSearchText(
                                                selectedProvince ? selectedProvince.name : ""
                                            );
                                        }}
                                        placeholder={{label: "Select province", value: null}}
                                        items={provinceData}
                                        value={selectedProvinceId}
                                        style={{
                                            inputIOS: {
                                                padding: 12,
                                                color: '#1F2937'
                                            },
                                            inputAndroid: {
                                                padding: 12,
                                                color: '#1F2937'
                                            }
                                        }}
                                    />
                                </View>
                            </View>

                            {/* City and District Row */}
                            <View className="flex-row justify-between">
                                <View className="w-[48%]">
                                    {renderInput(
                                        "City", 
                                        citySearchText, 
                                        handleCitySearch, 
                                        "Enter city",
                                        {
                                            editable: selectedProvinceId !== null,
                                            className: selectedProvinceId !== null 
                                                ? "bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base" 
                                                : "bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base opacity-50"
                                        }
                                    )}
                                    {filteredCities.length > 0 && (
                                        <FlatList
                                            data={filteredCities}
                                            renderItem={renderCityListItem}
                                            keyExtractor={(item) => item.id}
                                            className="absolute z-10 w-full border border-[#E5E7EB] rounded-lg bg-white"
                                        />
                                    )}
                                </View>
                                <View className="w-[48%]">
                                    {renderInput(
                                        "District", 
                                        districtSearchText, 
                                        handleDistrictSearch, 
                                        "Enter district",
                                        {
                                            editable: selectedCityId !== null,
                                            className: selectedCityId !== null 
                                                ? "bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base" 
                                                : "bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base opacity-50"
                                        }
                                    )}
                                    {filteredDistricts.length > 0 && (
                                        <FlatList
                                            data={filteredDistricts}
                                            renderItem={renderDistrictListItem}
                                            keyExtractor={(item) => item.id}
                                            className="absolute z-10 w-full border border-[#E5E7EB] rounded-lg bg-white"
                                        />
                                    )}
                                </View>
                            </View>

                            {/* Save Button */}
                            <TouchableOpacity
                                onPress={handleEditProfile}
                                className="bg-[#10B981] mt-6 items-center justify-center py-4 rounded-xl"
                            >
                                <Text className="text-white text-base font-bold">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}