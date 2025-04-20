import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "../screens/LandingScreen";
import DashboardScreen from "../screens/DashboardScreen";

const stack = createStackNavigator();

function AppNavigator() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="LandingScreen" component={LandingScreen} />
      <stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </stack.Navigator>
  );
}

export default AppNavigator;
