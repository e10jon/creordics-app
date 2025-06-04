import { View, Text, StyleSheet } from "react-native";

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const getInterpretation = (score: number): string => {
    if (score >= 45) {
      return "Profound significance. This idea has exceptional potential.";
    } else if (score >= 35) {
      return "Strong significance. This idea shows genuine promise.";
    } else if (score >= 25) {
      return "Moderate significance. Consider refining this idea further.";
    } else if (score >= 15) {
      return "Limited significance. This idea needs substantial development.";
    } else {
      return "Minimal significance. Consider exploring other directions.";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Creordic Score</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>
      <Text style={styles.interpretation}>{getInterpretation(score)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 24,
    backgroundColor: "#FFFFFF",
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  scoreCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 18,
  },
  interpretation: {
    fontSize: 14,
    color: "#666666",
  },
});
