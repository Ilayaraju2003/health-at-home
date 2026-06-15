import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

export default function CreateReminder() {
  const [reminder, setReminder] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const handleCreateReminder =
    async () => {
      try {
        const response =
          await fetch(
            "http://192.168.1.5:5000/reminders",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                reminder,
                notes,
                userId: 5,
              }),
            }
          );

        const data =
          await response.json();

        if (response.ok) {
          Alert.alert(
            "Success",
            "Reminder Created"
          );

          router.replace("/reminders");
        } else {
          Alert.alert(
            "Error",
            "Enter a reminder: " + data.message
          );
        }
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Failed to create reminder"
        );
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create Reminder
      </Text>

      <TextInput
        placeholder="Reminder"
        value={reminder}
        onChangeText={setReminder}
        style={styles.input}
      />

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={
          handleCreateReminder
        }
      >
        <Text
          style={styles.buttonText}
        >
          Add Reminder
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },

    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 12,
      marginBottom: 15,
    },

    button: {
      backgroundColor: "#007bff",
      padding: 15,
      borderRadius: 10,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });