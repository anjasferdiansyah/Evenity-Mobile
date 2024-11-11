import {Alert, FlatList, Text, TextInput, TouchableOpacity, View, ScrollView} from "react-native";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registMakeEvent, checkVendorAvailability} from "@/redux/slices/makeEventSlice";
import RNPickerSelect from "react-native-picker-select";

const provinceData = [
    {label: "JAWA BARAT", value: "32", name: "JAWA BARAT"},
    {label: "JAWA TENGAH", value: "33", name: "JAWA TENGAH"},
    {label: "JAWA TIMUR", value: "35", name: "JAWA TIMUR"},
    {label: "DKI JAKARTA", value: "31", name: "DKI JAKARTA"},
    {label: "D.I YOGYAKARTA", value: "34", name: "D.I YOGYAKARTA"},
];

const MakeEventLocation = () => {
    // Location search - City
    const [citySearchText, setCitySearchText] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    // Location search - City
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [provinceSearchText, setProvinceSearchText] = useState("");
    // Location search - District
    const [districtSearchText, setDistrictSearchText] = useState("");
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]); // ... previous state declarations ...
    const [isInputValid, setIsInputValid] = useState(false);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressEvent, setAddressEvent] = useState("");
    const [isVendorAvailable, setIsVendorAvailable] = useState(false); // Tambahkan state untuk ketersediaan vendor


    const validateInputs = useCallback(() => {
        if (
            citySearchText &&
            provinceSearchText &&
            districtSearchText &&
            addressEvent &&
            isVendorAvailable
        ) {
            setIsInputValid(true);
        } else {
            setIsInputValid(false);
        }
    }, [citySearchText, provinceSearchText, districtSearchText, addressEvent, isVendorAvailable]);

    useEffect(() => {
        validateInputs();
    }, [validateInputs]);

    useEffect(() => {
        let isMounted = true; // For cleanup
        // console.log("selectedProvinceId", selectedProvinceId);
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
                    // console.log("fetchCities", data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(`Error fetching cities: ${error.message}`);
                    console.error("Error fetching cities:", error);
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
                    console.error("Error fetching districts:", error);
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
        const filtered = availableCities.filter((city) =>
            city.name.toLowerCase().includes(newText.toLowerCase())
        );
        // console.log("filtered", filtered);
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

    const handleCitySelection = (selectedCity) => {
        setCitySearchText(selectedCity.name);
        setSelectedCityId(selectedCity.id);
        setFilteredCities([]);
    };

    const handleDistrictSelection = (selectedDistrict) => {
        setDistrictSearchText(selectedDistrict.name);
        setFilteredDistricts([]);
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

    // cek vendor exist
    useEffect(() => {
        const checkVendor = async () => {
            try {
                const response = await dispatch(checkVendorAvailability({ 
                    city: citySearchText, 
                    province: provinceSearchText 
                })).unwrap();

                if (response) {
                    setIsVendorAvailable(true);
                }
            } catch (error) {
                setIsVendorAvailable(false);
                Alert.alert("Vendor Not Found", "No vendor exists for the specified location.");
            }
        };

        console.log("citySearchText", citySearchText);
        console.log("provinceSearchText", provinceSearchText);

        if (citySearchText && provinceSearchText) {
            checkVendor();
        } else {
            setIsVendorAvailable(false);
        }
    }, [districtSearchText, dispatch]);

    const handleMakeEvent = async() => {
        if (!isInputValid) {
            Alert.alert(
                "Invalid Input",
                "Please enter a valid province, city, district and address."
            );
            return;

        } else {
            dispatch(
                registMakeEvent({
                    province: provinceSearchText,
                    city: citySearchText,
                    district: districtSearchText,
                    address: addressEvent,
                })
            );
        }
    };

    return (
        <MakeEventLayout
            progress={40}
            nextRoute="when"
            handleNext={handleMakeEvent}
            isInputValid={isInputValid}
        >
            <View className="px-10" style={tailwind`mt-5`}>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind``}>
                    Where's
                </Text>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
                    Event
                </Text>
                <Text className="text-6xl font-outfitExtraBold">location?</Text>
            </View>
            <View
                className="flex flex-col gap-4 w-full mt-12 px-10"
                style={tailwind`mt-7`}
            >
                <View className="flex flex-col gap-2 w-[90%]">
                    <Text className="font-outfitRegular">Province</Text>
                    <View
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full">
                        <RNPickerSelect
                            onValueChange={(value, index) => {
                                setSelectedProvinceId(value);
                                // If value exists, find the corresponding province and set its name
                                if (value) {
                                    const selectedProvince = provinceData.find(
                                        (p) => p.value === value
                                    );
                                    setProvinceSearchText(selectedProvince.name);
                                } else {
                                    setProvinceSearchText("");
                                }
                            }}
                            placeholder={{label: "Select province", value: null}}
                            useNativeAndroidPickerStyle={false}
                            pickerProps={{mode: "dropdown"}}
                            items={provinceData}
                        />
                    </View>
                </View>
                <View className="flex flex-row gap-2 w-[90%]">
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
                            <View 
                                style={{
                                    position: 'absolute', 
                                    top: '100%', 
                                    zIndex: 10, 
                                    width: '100%', 
                                    maxHeight: 200,
                                    borderWidth: 0.5,
                                    borderColor: 'gray',
                                    borderRadius: 8,
                                    backgroundColor: 'white'
                                }}
                            >   
                                <ScrollView 
                                    nestedScrollEnabled={true}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {filteredCities.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            className="p-5 border-b border-gray-400 w-full"
                                            onPress={() => handleCitySelection(item)}
                                        >
                                            <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
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
                            <View 
                                style={{
                                    position: 'absolute', 
                                    top: '100%', 
                                    zIndex: 10, 
                                    width: '100%', 
                                    maxHeight: 200,
                                    borderWidth: 0.5,
                                    borderColor: 'gray',
                                    borderRadius: 8,
                                    backgroundColor: 'white'
                                }}
                            >
                                <ScrollView 
                                    nestedScrollEnabled={true}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {filteredDistricts.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            className="p-5 border-b border-gray-400 w-full"
                                            onPress={() => handleDistrictSelection(item)}
                                        >
                                            <Text className="text-sm font-outfitSemiBold">{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </View>
                <View className="flex flex-col gap-2 w-[90%]">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular opacity-50">Event Address</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            placeholder="Enter your event name"
                            value={addressEvent}
                            onChangeText={setAddressEvent}
                        />
                    </View>
                </View>
            </View>
        </MakeEventLayout>
    );
};

export default MakeEventLocation;
