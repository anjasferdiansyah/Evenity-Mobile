import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {validateUser} from "@/helper/validator/auth";
import {useDispatch, useSelector} from "react-redux";
import {register} from "@/redux/slices/authSlice";
import {router} from "expo-router";
import RNPickerSelect from "react-native-picker-select";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [districtQuery, setDistrictQuery] = useState('');
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [districtSuggestions, setDistrictSuggestions] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                if (!selectedProvince) return;
                const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                if (!selectedCity) return;
                const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity}.json`);
                const data = await response.json();
                setDistrictSuggestions(data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchDistricts();
    }, [selectedCity]);

    const handleCitySearch = (text) => {
        if (text.length < query.length) {
            setQuery("");
            setSelectedCity(null);
            setDistrictQuery("");
            return;
        }
        setQuery(text);
        const filtered = suggestions.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredSuggestions(text === '' ? [] : filtered);
    };

    const handleDistrictSearch = (text) => {
        if (text.length < districtQuery.length) {
            setDistrictQuery("");
            return;
        }
        setDistrictQuery(text);
        const filtered = districtSuggestions.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDistricts(text === '' ? [] : filtered);
    };

    const handleSelectCity = (city) => {
        setQuery(city.name);
        setSelectedCity(city.id);
        setFilteredSuggestions([]);
    };

    const handleSelectDistrict = (district) => {
        setDistrictQuery(district.name);
        setFilteredDistricts([]);
    };

    const {registerData} = useSelector((state) => state.auth);
    console.log(registerData)

    const renderCitySuggestion = ({item}) => (
        <TouchableOpacity
            className="p-5 bg-white border-b border-gray-400 w-full"
            onPress={() => handleSelectCity(item)}
        >
            <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
        </TouchableOpacity>
    );

    const renderDistrictSuggestion = ({item}) => (
        <TouchableOpacity
            className="p-5 bg-white border-b border-gray-400 w-full"
            onPress={() => handleSelectDistrict(item)}
        >
            <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
        </TouchableOpacity>
    );

    const dispatch = useDispatch();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const {success, error} = validateUser({email, password});
        if (!success) {
            alert(error);
        } else {
            dispatch(register({
                email,
                password,
                province: selectedProvince,
                city: selectedCity,
                district: districtQuery
            }));
            router.push("auth/completing-register");
        }
    };
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-[70%] px-10 flex-1 justify-center">
                <Text className="text-5xl font-outfitBold text-center my-12">Register</Text>

                <View className="flex flex-col gap-4 w-full items-center">
                    <View className="flex flex-col gap-2 w-[90%]">
                        <Text className="font-outfitRegular">Email</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            placeholder="Enter your email.."
                            maxLength={50}
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                    <View className="flex flex-col gap-2 w-[90%]">
                        <Text className="font-outfitRegular">Province</Text>
                        <View
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full">
                            <RNPickerSelect onValueChange={value =>
                                setSelectedProvince(value)
                            } placeholder={{label: 'Select province', value: ''}} useNativeAndroidPickerStyle={false}
                                            pickerProps={{mode: 'dropdown'}} items={[
                                {
                                    label: "JAWA BARAT",
                                    value: "32"
                                },
                                {
                                    label: "JAWA TENGAH",
                                    value: "33"
                                },
                                {
                                    label: "JAWA TIMUR",
                                    value: "35"
                                },
                                {
                                    label: "DKI JAKARTA",
                                    value: "31"
                                },
                                {
                                    label: "D.I YOGYAKARTA",
                                    value: "34"
                                }

                            ]}/>
                        </View>

                    </View>
                    <View className="flex flex-row gap-2 w-[90%]">
                        <View className="flex flex-col gap-2 w-[50%]">
                            <Text className="font-outfitRegular">City</Text>
                            <TextInput
                                className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                placeholder="Enter your email.."
                                maxLength={50}
                                onChangeText={handleCitySearch}
                                value={query}
                            />
                            {filteredSuggestions.length > 0 && (
                                <FlatList
                                    data={filteredSuggestions}
                                    renderItem={renderCitySuggestion}
                                    keyExtractor={(item) => item.id}
                                    className="absolute z-10 top-20 w-full border-[0.5px] h-fit max-h-[300%] rounded-lg border-gray-400"
                                />
                            )}
                        </View>
                        <View className="flex flex-col gap-2 w-[50%]">
                            <Text className="font-outfitRegular">District</Text>
                            <TextInput
                                className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                placeholder="Enter district"
                                onChangeText={handleDistrictSearch}
                                value={districtQuery}
                            />
                            {filteredDistricts.length > 0 && (
                                <FlatList
                                    data={filteredDistricts}
                                    renderItem={renderDistrictSuggestion}
                                    keyExtractor={(item) => item.id}
                                    className="absolute z-10 top-20 w-full border-[0.5px] h-fit max-h-[300%] rounded-lg border-gray-400"
                                />
                            )}
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
                            value={password}
                            autoComplete="current-password"
                            autoCapitalize="none"
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            placeholder="Enter your password"
                            maxLength={50}
                            onChangeText={setPassword}
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
                            value={confirmPassword}
                            autoComplete="current-password"
                            autoCapitalize="none"
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            placeholder="Enter your password"
                            maxLength={50}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleRegister()}
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
        </View>
    );
};

export default RegisterScreen;