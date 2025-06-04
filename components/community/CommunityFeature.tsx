import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "@gluestack-ui/themed";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function CommunityFeature() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="1" />
            <path d="M9 20h6" />
            <path d="M12 20v-8" />
            <path d="M12 16c5 0 8-2.1 8-5s-3-5-8-5-8 2.1-8 5 3 5 8 5Z" />
          </svg>
        </View>
      </View>

      <Text style={styles.title}>Community Feature Coming Soon</Text>

      <Text style={styles.description}>
        Connect with like-minded thinkers, share meaningful ideas, and
        collaborate on projects that make a difference in the world.
      </Text>

      <View style={styles.buttonContainer}>
        <Button>
          <Text style={styles.buttonText}>Join the waiting list</Text>
        </Button>
      </View>

      <View style={styles.featuresGrid}>
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1612128886521-277ca9244316?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVudfGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
              alt="Discussion groups"
              style={styles.featureImage}
            />
          </View>
          <Text style={styles.featureTitle}>Discussion Groups</Text>
          <Text style={styles.featureDescription}>
            Exchange ideas in topic-based forums
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVudfGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
              alt="Collaborative projects"
              style={styles.featureImage}
            />
          </View>
          <Text style={styles.featureTitle}>Projects</Text>
          <Text style={styles.featureDescription}>
            Collaborate on meaningful initiatives
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  featureCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F0F0",
    overflow: "hidden",
    marginBottom: 8,
  },
  featureImage: {
    width: "100%",
    height: "100%",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
