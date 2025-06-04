import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { RecursionIcon } from "./RecursionIcon";
import { CompassFeature } from "./compass/CompassFeature";
import { ChatFeature } from "./chat/ChatFeature";
import { NewsFeature } from "./news/NewsFeature";
import { CommunityFeature } from "./community/CommunityFeature";
import { BottomNav } from "./navigation/BottomNav";
import { UserProfile } from "./auth/UserProfile";

export function MainApp() {
  const [activeTab, setActiveTab] = useState<string>("compass");

  const renderActiveFeature = () => {
    switch (activeTab) {
      case "compass":
        return <CompassFeature />;
      case "chat":
        return <ChatFeature />;
      case "news":
        return <NewsFeature />;
      case "community":
        return <CommunityFeature />;
      default:
        return <CompassFeature />;
    }
  };

  const getFeatureTitle = (): string => {
    switch (activeTab) {
      case "compass":
        return "Creordic Compass";
      case "chat":
        return "Creordic Chatbot";
      case "news":
        return "Creordic News";
      case "community":
        return "Creordic Community";
      default:
        return "Creordic";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <RecursionIcon />
            <Text style={styles.headerTitle}>{getFeatureTitle()}</Text>
          </View>
          <UserProfile />
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>{renderActiveFeature()}</View>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    overflow: "hidden",
  },
});
