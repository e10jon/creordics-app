import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    {
      id: "compass",
      label: "Compass",
      icon: "🧭",
    },
    {
      id: "chat",
      label: "Chatbot",
      icon: "💬",
    },
    {
      id: "news",
      label: "News",
      icon: "📰",
    },
    {
      id: "community",
      label: "Community",
      icon: "👥",
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabChange(tab.id)}
        >
          <Text style={styles.icon}>{tab.icon}</Text>
          <Text
            style={[
              styles.label,
              activeTab === tab.id ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  activeLabel: {
    color: "#000",
  },
  inactiveLabel: {
    color: "#666",
  },
});
