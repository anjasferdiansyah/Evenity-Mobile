import React, { useEffect, useState } from "react";
import { 
    FlatList, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// Import helper dan konstanta
import { validateRegistration } from "@/helper/validator/auth";
import { register } from "@/redux/slices/authSlice";
import { fetchCities, fetchDistricts, provinceData } from "@/helper/location";
import { ROUTES } from "@/constant/ROUTES";

export default function RegisterScreen() {
    // State Credentials
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState(true);

    // State Location
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [provinceSearchText, setProvinceSearchText] = useState("");
    
    const [citySearchText, setCitySearchText] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    
    const [districtSearchText, setDistrictSearchText] = useState("");
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);

    // State Management
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // Fetch Cities when Province changes
    useEffect(() => {
        let isMounted = true;
        fetchCities({
            setError, 
            setIsLoading, 
            selectedProvinceId, 
            setAvailableCities, 
            isMounted
        });
        return () => { isMounted = false; };
    }, [selectedProvinceId]);

    // Fetch Districts when City changes
    useEffect(() => {
        let isMounted = true;
        fetchDistricts({
            setError, 
            setIsLoading, 
            selectedCityId, 
            isMounted, 
            setAvailableDistricts
        });
        return () => { isMounted = false; };
    }, [selectedCityId]);

    // City Search Handler
    const handleCitySearch = (text) => {

        setCitySearchText(text); // Langsung set text tanpa trim

        if (!selectedProvinceId) return;

        // Filter cities
        const filtered = availableCities.filter((city) =>
            city.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCities(text === "" ? [] : filtered);
    };

    // District Search Handler
    const handleDistrictSearch = (text) => {
         setDistrictSearchText(text); // Langsung set text

        if (!selectedCityId) return;

        // Filter districts
        const filtered = availableDistricts.filter((district) =>
            district.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDistricts(text === "" ? [] : filtered);
    };

   

    // Registration Handler
    const handleRegistration = () => {
        const formData = {
            userEmail,
            userPassword,
            userPasswordConfirmation,
            provinceSearchText,
            citySearchText,
            districtSearchText,
        };

        const { success, data, error } = validateRegistration(formData);

        if (!success) {
            alert(error[0]?.message || "Registration failed");
            return;
        }

        dispatch(register({
            email: data.userEmail,
            password: data.userPassword,
            province: data.provinceSearchText,
            city: data.citySearchText,
            district: data.districtSearchText,
        }));

        router.push(ROUTES.AUTH.COMPLETING_REGISTER);
    };

    const handleCitySelection = (selectedCity) => {
        setCitySearchText(selectedCity.name);
        setSelectedCityId(selectedCity.id);
        setFilteredCities([]);
      
    };

    // District Selection Handler
    const handleDistrictSelection = (selectedDistrict) => {
        setDistrictSearchText(selectedDistrict.name);
        setFilteredDistricts([]);
    };
    // Render Methods
    const renderCityListItem = ({ item }) => (
        <TouchableOpacity
            className="p-3 bg-white border-b border-gray-200"
            onPress={() => handleCitySelection(item)}
        >
            <Text className="text-sm font-outfitRegular">{item.name}</Text>
        </TouchableOpacity>
    );

    const renderDistrictListItem = ({ item }) => (
        <TouchableOpacity
            className="p-3 bg-white border-b border-gray-200"
            onPress={() => handleDistrictSelection(item)}
        >
            <Text className="text-sm font-outfitRegular">{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <LinearGradient 
            colors={['#F0FFF4', '#E6FFF4', '#D4FAF0']} 
            className="flex-1"
        >
            <View className="w-full h-full px-6 flex-1 justify-center">
                <Animated.View 
                    entering={FadeInUp} 
                    className="mb-10 items-center"
                >
                    <Text className="text-4xl font-outfitBold text-gray-800 mt-10">
                        Create Account
                    </Text>
                    <Text className="text-gray-500 mt-2 text-center font-outfitLight">
                        Join and Make Your Event Easier
                    </Text>
                </Animated.View>
                
                <View className="bg-white/80 rounded-2xl shadow-md p-6">
                    <Animated.View entering={FadeInDown.delay(200)} className="mb-4">
                        <Text className="text-gray-600 mb-2 font-outfitRegular">Email Address</Text>
                        <View className="border border-gray-200 rounded-lg">
                            <TextInput
                                className="py-3 px-4 text-base text-gray-700 font-outfitRegular"
                                placeholder="Enter your email"
                                value={userEmail}
                                onChangeText={setUserEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300)} className="mb-4">
                        <Text className="font-outfitRegular">Province</Text>
                        <View className="border border-gray-200 rounded-lg">
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    setSelectedProvinceId(value);
                                    if (value) {
                                        const selectedProvince = provinceData.find(
                                            (p) => p.value === value
                                        );
                                        setProvinceSearchText(selectedProvince.name);
                                    } else {
                                        setProvinceSearchText("");
                                    }
                                }}
                                placeholder={{ label: "Select province", value: null }}
                                useNativeAndroidPickerStyle={false}
                                pickerProps={{ mode: "dropdown" }}
                                items={provinceData}
                                style={{
                                    inputAndroid: {
                                        paddingVertical: 12,
                                        paddingHorizontal: 16,
                                        color: '#4A5568',
                                        fontSize: 16,
                                    },
                                    inputIOS: {
                                        paddingVertical: 12,
                                        paddingHorizontal: 16,
                                        color: '#4A5568',
                                        fontSize: 16,
                                    },
                                }}
                            />
                        </View>
                    </Animated.View>
                    

                    
                    {/* <Animated.View entering={FadeInDown.delay(400)} className="mb-4 flex flex-row gap-1"> */}
                    <View className="flex flex-row gap-1 mb-4">
                        <View className="flex flex-col gap-2 w-1/2">
                            <Text className={selectedProvinceId !== null ? "font-outfitRegular text-gray-600" : "font-outfitRegular text-gray-600"}>
                                City
                            </Text>
                            <TextInput
                                editable={selectedProvinceId !== null}
                                className={selectedProvinceId !== null ? "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full" : "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full opacity-50"}
                                placeholder="Enter city.."
                                maxLength={50}
                                onChangeText={handleCitySearch}
                                value={citySearchText}
                                autoCorrect={false}
                                autoCapitalize="none"
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

                        <View className="flex flex-col gap-2 w-1/2">
                            <Text className={selectedCityId !== null ? "font-outfitRegular text-gray-600" : "font-outfitRegular text-gray-600"}>
                                District
                            </Text>
                            <TextInput
                                editable={selectedCityId !== null}
                                className={selectedCityId !== null ? "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full" : "border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full opacity-50"}
                                placeholder="Enter district.."
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
                    {/* </Animated.View> */}
                    

                    <Animated.View entering={FadeInDown.delay(500)} className="mb-4">
                        <Text className="text-gray-600 mb-2 font-outfitRegular">Password</Text>
                        <View className="border border-gray-200 rounded-lg relative">
                            <TextInput
                                className="py-3 px-4 pr-12 text-base text-gray-700 font-outfitRegular"
                                placeholder="Enter password"
                                secureTextEntry={hidePassword}
                                value={userPassword}
                                onChangeText={setUserPassword}
                            />
                            <TouchableOpacity 
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                onPress={() => setHidePassword(!hidePassword)}
                            >
                                <MaterialCommunityIcons
                                    name={hidePassword ? "eye" : "eye-off"}
                                    color="black"
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    

                    <Animated.View entering={FadeInDown.delay(600)} className="mb-4">
                        <Text className="text-gray-600 mb-2 font-outfitRegular">Confirm Password</Text>
                        <View className="border border-gray-200 rounded-lg relative">
                            <TextInput
                                className="py-3 px-4 pr-12 text-base text-gray-700 font-outfitRegular"
                                placeholder="Confirm your password"
                                secureTextEntry={hidePasswordConfirmation}
                                value={userPasswordConfirmation}
                                onChangeText={setUserPasswordConfirmation}
                            />
                            <TouchableOpacity 
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                onPress={() => setHidePasswordConfirmation(!hidePasswordConfirmation)}
                            >
                                <MaterialCommunityIcons
                                    name={hidePasswordConfirmation ? "eye" : "eye-off"}
                                    color="black"
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    
                    <TouchableOpacity
                        onPress={handleRegistration}
                        className="bg-[#10B981] rounded-full py-3 mt-6"
                    >
                        <Text className="text-white text-center text-lg font-outfitBold">
                            Register
                        </Text>
                    </TouchableOpacity>

                    <Text className="text-center text-gray-500 text-sm mt-4 font-outfitRegular">
                        Already have an account?{" "}
                        <Text
                            className="text-[#10B981] font-outfitBold"
                            onPress={() => router.push(ROUTES.AUTH.LOGIN)}
                        >
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
}