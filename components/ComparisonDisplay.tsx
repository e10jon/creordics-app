import { View, Text, StyleSheet } from "react-native";

interface ComparisonDisplayProps {
  firstIdeaName: string;
  secondIdeaName: string;
  firstScore: number;
  secondScore: number;
}

export function ComparisonDisplay({
  firstIdeaName,
  secondIdeaName,
  firstScore,
  secondScore,
}: ComparisonDisplayProps) {
  const maxScore = 50; // Maximum possible score
  const firstPercentage = (firstScore / maxScore) * 100;
  const secondPercentage = (secondScore / maxScore) * 100;

  const getDifference = () => {
    const diff = Math.abs(firstScore - secondScore);
    if (diff === 0) return "Both ideas have equal scores.";
    const higher = firstScore > secondScore ? firstIdeaName : secondIdeaName;
    return `${higher} scores ${diff} points higher.`;
  };

  const getRecommendation = () => {
    const diff = Math.abs(firstScore - secondScore);
    if (diff < 5)
      return "Both ideas show similar potential. Consider combining their strengths.";
    const higher = firstScore > secondScore ? firstIdeaName : secondIdeaName;
    return `Consider focusing on ${higher} as it shows stronger potential.`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comparison Results</Text>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreItem}>
          <View style={styles.scoreHeader}>
            <Text style={styles.ideaName}>{firstIdeaName}</Text>
            <Text style={styles.scoreText}>{firstScore} / 50</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${firstPercentage}%` }]}
            />
          </View>
        </View>

        <View style={styles.scoreItem}>
          <View style={styles.scoreHeader}>
            <Text style={styles.ideaName}>{secondIdeaName}</Text>
            <Text style={styles.scoreText}>{secondScore} / 50</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${secondPercentage}%` }]}
            />
          </View>
        </View>
      </View>

      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationText}>{getDifference()}</Text>
        <Text style={styles.recommendationTextBold}>{getRecommendation()}</Text>
      </View>
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
    gap: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  scoreContainer: {
    gap: 16,
  },
  scoreItem: {
    gap: 4,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ideaName: {
    fontSize: 14,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  recommendationContainer: {
    gap: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: "#666666",
  },
  recommendationTextBold: {
    fontSize: 14,
    fontWeight: "500",
  },
});
