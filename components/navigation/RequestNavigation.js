import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import ListRequestScreen from '../../screens/ListRequestScreen'
import DetailRequest from '../../screens/DetailRequest'


const Stack = createNativeStackNavigator()
const RequestNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListRequest" component={ListRequestScreen}/>
        <Stack.Screen name='DetailRequest' component={DetailRequest} />
    </Stack.Navigator>
  )
}

export default RequestNavigation