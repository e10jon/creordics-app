import React from "react";
import { View, StyleSheet } from "react-native";

export function RecursionIcon() {
  return (
    <View style={styles.icon}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      <View style={styles.line1} />
      <View style={styles.line2} />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    position: "relative",
  },
  circle1: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  circle2: {
    position: "absolute",
    top: 6,
    left: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
  },
  circle3: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#000",
  },
  line1: {
    position: "absolute",
    top: 11,
    left: 2,
    width: 20,
    height: 2,
    backgroundColor: "#000",
  },
  line2: {
    position: "absolute",
    top: 2,
    left: 11,
    width: 2,
    height: 20,
    backgroundColor: "#000",
  },
});
