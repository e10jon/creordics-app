import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./components/auth/AuthProvider";
import { AppNavigator } from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
