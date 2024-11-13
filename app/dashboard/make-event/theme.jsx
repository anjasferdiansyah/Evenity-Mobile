import {ScrollView, Text, TextInput, View} from "react-native";
import {useDispatch} from "react-redux";
import {registMakeEvent} from "@/redux/slices/makeEventSlice";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {eventThemeSchema} from "@/helper/validator/schema";

// import MakeEventLayout from "../dashboard/(tabs)/MakeEventLayout";
import tailwind from "twrnc";
import MakeEventLayout from "@/components/make-event/layout";
import BottomPadding from "@/components/misc/BottomPadding";

const MakeEventTheme = () => {
    const dispatch = useDispatch();

    const {control, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: zodResolver(eventThemeSchema),
        mode: "onChange",
        defaultValues: {
            theme: "",
        }
    });


    const onSubmit = (data) => {

        dispatch(
            registMakeEvent({
                theme: data.themeEvent,
            })
        );

    };

    console.log("isValid", isValid);

    return (
        <MakeEventLayout
            progress={50}
            nextRoute="capacity"
            isInputValid={isValid}
            handleNext={handleSubmit(onSubmit)}
        >
            <ScrollView>
                <View className="px-10" style={tailwind`mt-5`}>
                    <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
                        What Event
                    </Text>
                    <Text className="text-6xl font-outfitExtraBold">Theme?</Text>
                </View>
                <View className="flex flex-col gap-4 w-full mt-12 px-10">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular">Event Theme</Text>
                        <Controller
                            control={control}
                            name="themeEvent"
                            render={({field: {onChange, value}}) => (
                                <TextInput
                                    className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                    placeholder="Enter your event theme"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors && errors.themeEvent && (
                            <Text className="text-red-500">{errors.themeEvent.message}</Text>
                        )}
                    </View>
                </View>
                <BottomPadding/>
            </ScrollView>
        </MakeEventLayout>
    );
};

export default MakeEventTheme;
