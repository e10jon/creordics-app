import { View, Text, StyleSheet } from "react-native";

export function FactorLegend() {
  const factors = [
    {
      name: "Actions",
      description: "The ability to take action and create change",
      lowValue: "Completely passive, theoretical only",
      highValue: "Highly actionable with clear steps",
    },
    {
      name: "Truth Alignment",
      description: "How well the idea aligns with objective reality",
      lowValue: "Contradicts established knowledge",
      highValue: "Strongly supported by evidence",
    },
    {
      name: "Meaningful Impact",
      description: "The potential to create significant positive change",
      lowValue: "Minimal or negative effects",
      highValue: "Transformative, far-reaching benefits",
    },
    {
      name: "Transmissibility",
      description: "How easily the idea can be shared and understood",
      lowValue: "Complex, difficult to communicate",
      highValue: "Intuitive, easily grasped by others",
    },
    {
      name: "Replicability",
      description: "How consistently the idea produces similar results",
      lowValue: "Highly variable outcomes",
      highValue: "Consistent, predictable results",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Factor Legend</Text>
      <View style={styles.factorsContainer}>
        {factors.map((factor) => (
          <View key={factor.name} style={styles.factorItem}>
            <Text style={styles.factorName}>{factor.name}</Text>
            <Text style={styles.factorDescription}>{factor.description}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>1: {factor.lowValue}</Text>
              <Text style={styles.valueText}>10: {factor.highValue}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  factorsContainer: {
    gap: 16,
  },
  factorItem: {
    gap: 4,
  },
  factorName: {
    fontSize: 16,
    fontWeight: "500",
  },
  factorDescription: {
    fontSize: 14,
    color: "#666666",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  valueText: {
    fontSize: 12,
    color: "#666666",
  },
});
