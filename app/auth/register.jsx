import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {validateRegistration} from "@/helper/validator/auth";
import {useDispatch} from "react-redux";
import {register} from "@/redux/slices/authSlice";
import {router} from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import {setupAxios} from "@/config/axiosConfig";

const provinceData = [
    {label: "JAWA BARAT", value: "32", name: "JAWA BARAT"},
    {label: "JAWA TENGAH", value: "33", name: "JAWA TENGAH"},
    {label: "JAWA TIMUR", value: "35", name: "JAWA TIMUR"},
    {label: "DKI JAKARTA", value: "31", name: "DKI JAKARTA"},
    {label: "D.I YOGYAKARTA", value: "34", name: "D.I YOGYAKARTA"}
];

export default function RegisterScreen() {
    setupAxios()
// User credentials
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
// Location search - City
    const [citySearchText, setCitySearchText] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
// Location search - City
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [provinceSearchText, setProvinceSearchText] = useState('');
// Location search - District
    const [districtSearchText, setDistrictSearchText] = useState('');
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);// ... previous state declarations ...

// Add loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        let isMounted = true; // For cleanup
        const fetchCities = async () => {
            // Reset error state
            setError(null);
            setIsLoading(true);

            try {
                if (!selectedProvinceId) return;
                const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`);
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
                    console.error('Error fetching cities:', error);
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
                const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCityId}.json`);
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
                    console.error('Error fetching districts:', error);
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
        const filtered = availableCities.filter((city) => city.name.toLowerCase().includes(newText.toLowerCase()));
        setFilteredCities(newText === '' ? [] : filtered);
    };

    const handleDistrictSearch = (text) => {
        const newText = text.trim();

        if (newText.length < districtSearchText.length) {
            setDistrictSearchText("");
            return;
        }

        setDistrictSearchText(newText);

        // Use the newText parameter directly for filtering
        const filtered = availableDistricts.filter((district) => district.name.toLowerCase().includes(newText.toLowerCase()));
        setFilteredDistricts(newText === '' ? [] : filtered);
    };

    const handleRegistration = () => {
        const formData = {
            userEmail, userPassword, userPasswordConfirmation, provinceSearchText, citySearchText, districtSearchText
        };

        const {success, data, error} = validateRegistration(formData);

        if (!success) {
            // Display first error message
            if (error && error.length > 0) {
                alert(error[0].message);
                return;
            }
            return;
        }

        // If validation passes, proceed with registration
        dispatch(register({
            email: data.userEmail,
            password: data.userPassword,
            province: data.provinceSearchText,
            city: data.citySearchText,
            district: data.districtSearchText
        }));

        router.push("auth/completing-register");
    };
    const handleCitySelection = (selectedCity) => {
        setCitySearchText(selectedCity.name);
        setSelectedCityId(selectedCity.id);
        setFilteredCities([]);
    };

    const handleDistrictSelection = (selectedDistrict) => {
        setDistrictSearchText(selectedDistrict.name);
        setFilteredDistricts([]);
    };

    const renderCityListItem = ({item}) => (<TouchableOpacity
        className="p-5 bg-white border-b border-gray-400 w-full"
        onPress={() => handleCitySelection(item)}
    >
        <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
    </TouchableOpacity>);

    const renderDistrictListItem = ({item}) => (<TouchableOpacity
        className="p-5 bg-white border-b border-gray-400 w-full"
        onPress={() => handleDistrictSelection(item)}
    >
        <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
    </TouchableOpacity>);

    return (<View className="flex-1 items-center justify-center bg-white">
        <View className="w-full h-[70%] px-10 flex-1 justify-center">
            <Text className="text-5xl font-outfitBold text-center my-12">Register</Text>

            <View className="flex flex-col gap-4 w-full items-center">
                <View className="flex flex-col gap-2 w-[90%]">
                    <Text className="font-outfitRegular">Email</Text>
                    <TextInput
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Enter your email.."
                        maxLength={50}
                        onChangeText={setUserEmail}
                        value={userEmail}
                    />
                </View>
                <View className="flex flex-col gap-2 w-[90%]">
                    <Text className="font-outfitRegular">Province</Text>
                    <View
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full">
                        <RNPickerSelect
                            onValueChange={(value, index) => {
                                setSelectedProvinceId(value);
                                // If value exists, find the corresponding province and set its name
                                if (value) {
                                    const selectedProvince = provinceData.find(p => p.value === value);
                                    setProvinceSearchText(selectedProvince.name);
                                } else {
                                    setProvinceSearchText("");
                                }
                            }}
                            placeholder={{label: 'Select province', value: null}}
                            useNativeAndroidPickerStyle={false}
                            pickerProps={{mode: 'dropdown'}}
                            items={provinceData}
                        />
                    </View>

                </View>
                <View className="flex flex-row gap-2 w-[90%]">
                    <View className="flex flex-col gap-2 w-[50%]">
                        <Text
                            className={selectedProvinceId !== null ? "font-outfitRegular" : "font-outfitRegular opacity-50"}>City</Text>
                        <TextInput
                            editable={selectedProvinceId !== null}
                            // className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            className={selectedProvinceId !== null ? "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full" : "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full opacity-50"}
                            placeholder="Enter your email.."
                            maxLength={50}
                            onChangeText={handleCitySearch}
                            value={citySearchText}
                        />
                        {filteredCities.length > 0 && (<FlatList
                            data={filteredCities}
                            renderItem={renderCityListItem}
                            keyExtractor={(item) => item.id}
                            className="absolute z-10 top-20 w-full border-[0.5px] h-fit max-h-[300%] rounded-lg border-gray-400"
                        />)}
                    </View>
                    <View className="flex flex-col gap-2 w-[50%]">
                        <Text
                            className={selectedCityId !== null ? "font-outfitRegular" : "font-outfitRegular opacity-50"}>District</Text>
                        <TextInput
                            // className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            editable={selectedCityId !== null}
                            className={
                                selectedCityId !== null ? "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full" : "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full opacity-50"
                            }
                            placeholder="Enter district"
                            onChangeText={handleDistrictSearch}
                            value={districtSearchText}
                        />
                        {filteredDistricts.length > 0 && (<FlatList
                            data={filteredDistricts}
                            renderItem={renderDistrictListItem}
                            keyExtractor={(item) => item.id}
                            className="absolute z-10 top-20 w-full border-[0.5px] h-fit max-h-[300%] rounded-lg border-gray-400"
                        />)}
                    </View>
                </View>

                <View className="flex flex-col gap-2 w-[90%]">
                    <Text>Password</Text>
                    <MaterialCommunityIcons
                        className="absolute right-4 top-[38px] "
                        name="eye"
                        color={"gray"}
                        size={20}
                    />
                    <TextInput
                        secureTextEntry={true}
                        autoCorrect={false}
                        value={userPassword}
                        autoComplete="current-password"
                        autoCapitalize="none"
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Enter your password"
                        maxLength={50}
                        onChangeText={setUserPassword}
                    />
                </View>
                <View className="flex flex-col gap-2 w-[90%]">
                    <Text>Confirm Password</Text>
                    <MaterialCommunityIcons
                        className="absolute right-4 top-[38px] "
                        name="eye"
                        color={"gray"}
                        size={20}
                    />
                    <TextInput
                        secureTextEntry={true}
                        autoCorrect={false}
                        value={userPasswordConfirmation}
                        autoComplete="current-password"
                        autoCapitalize="none"
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Enter your password"
                        maxLength={50}
                        onChangeText={setUserPasswordConfirmation}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => handleRegistration()}
                              className="bg-[#00AA55] mx-auto w-[90%] mt-14 items-center justify-center px-8 py-3 rounded-full">
                <Text className="text-white text-xl font-outfitBold py-1.5">Register</Text>
            </TouchableOpacity>
            <Text className="text-center text-gray-500 text-xs mt-4 font-outfitRegular">
                Have an account?{" "}
                <Text
                    className="text-blue-500"
                    onPress={() => router.push("auth/login")}
                >
                    Login
                </Text>
            </Text>
        </View>
    </View>);
};