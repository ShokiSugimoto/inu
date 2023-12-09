// AppNavigator.js

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import UserDataScreen from './UserDataScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserData" component={UserDataScreen} />
      {/* 其他屏幕 */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
