import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface PhilosophicalSliderProps {
  label: string;
  value: number;
  onChange: (values: number[]) => void;
}

export function PhilosophicalSlider({
  label,
  value,
  onChange,
}: PhilosophicalSliderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueCircle}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>
      <Slider
        value={value}
        onValueChange={(newValue) => onChange([newValue])}
        minimumValue={1}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#E5E5E5"
        thumbTintColor="#007AFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  valueCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
  },
});
