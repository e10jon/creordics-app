import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "@gluestack-ui/themed";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function NewsFeature() {
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
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M18 18h-8" />
            <path d="M18 10h-8" />
          </svg>
        </View>
      </View>

      <Text style={styles.title}>News Feature Coming Soon</Text>

      <Text style={styles.description}>
        Stay tuned for thoughtful articles, philosophical insights, and updates
        on the latest developments in meaningful thinking.
      </Text>

      <View style={styles.buttonContainer}>
        <Button>
          <Text style={styles.buttonText}>Get notified when available</Text>
        </Button>
      </View>

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Preview: Featured Article</Text>
        <Text style={styles.previewDescription}>
          The Recursive Nature of Meaning: Understanding How Ideas Shape Reality
        </Text>
        <View style={styles.imageContainer}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVudfGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Abstract geometric patterns illustrating recursive structures"
            style={styles.previewImage}
          />
        </View>
        <Text style={styles.comingSoon}>Coming in July 2025</Text>
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
  previewContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  comingSoon: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
