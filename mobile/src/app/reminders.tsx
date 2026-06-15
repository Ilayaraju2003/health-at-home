import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import { getReminders } from "@/services/reminderService";
import ReminderListItem from "@/components/ReminderListItem";
import { Reminder } from "@/types/reminder";

export default function HomeScreen() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Reminder[]>({
    queryKey: ["reminders"],
    queryFn: getReminders,
  });

  const handleAddReminder = () => {
    router.push("/createReminder");
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error instanceof Error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        My Reminders
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ReminderListItem
              reminderItem={item}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No reminders found
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddReminder}
      >
        <Text style={styles.fabText}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 15,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#666",
    fontSize: 16,
  },

  errorText: {
    color: "red",
    fontSize: 16,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});