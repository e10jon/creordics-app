import { View, Text, StyleSheet, Animated } from "react-native";
import { RecursionIcon } from "../RecursionIcon";

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Animated.View style={styles.iconContainer}>
        <RecursionIcon />
      </Animated.View>
      <Text style={styles.loadingText}>Loading Creordic...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    opacity: 0.5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
  },
});
