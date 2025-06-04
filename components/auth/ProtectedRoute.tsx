import React, { ReactNode } from "react";
import { View } from "react-native";
import { useMockAuth } from "./mock-auth-provider";
import { WelcomeScreen } from "./WelcomeScreen";
import { LoadingScreen } from "./LoadingScreen";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useMockAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <WelcomeScreen />;
  }

  return <View>{children}</View>;
}
