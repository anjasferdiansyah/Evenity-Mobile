import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import ListRequestScreen from '../../screens/ListRequestScreen'
import DetailRequest from '../../screens/DetailRequest'
import HistoryOrderScreen from '../../screens/HistoryOrderScreen'
import HistoryOrderDetailScreen from '../../screens/HistoryOrderDetailScreen'
import WithdrawScreen from '../../screens/WithdrawScreen'
import WithdrawHistoryScreen from '../../screens/WithdrawHistoryScreen'


const Stack = createNativeStackNavigator()
const HistoryNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListHistory" component={HistoryOrderScreen}/>
        <Stack.Screen name='DetailHistory' component={HistoryOrderDetailScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen}/>
        <Stack.Screen name='WithdrawHistory' component={WithdrawHistoryScreen} />
    </Stack.Navigator>
  )
}

export default HistoryNavigation