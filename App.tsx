import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { WorkoutProvider } from "./context/WorkoutContext";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "./screens/CalendarScreen";
import WorkoutScreen from "./screens/WorkoutScreen";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};
export default function App() {
  return (
    <SafeAreaProvider>
      <WorkoutProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Workouts"
              component={WorkoutScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WorkoutProvider>
    </SafeAreaProvider>
  );
}
