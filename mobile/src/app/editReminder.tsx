import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";

import {
    useLocalSearchParams,
    router,
} from "expo-router";

export default function EditReminder() {
    const { id } = useLocalSearchParams();

    const [reminder, setReminder] =
        useState("");

    const [notes, setNotes] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchReminder();
    }, []);

    const fetchReminder = async () => {
        try {
            const response = await fetch(
                `http://192.168.1.5:5000/reminders/${id}`
            );

            const data =
                await response.json();

            setReminder(data.reminder);
            setNotes(data.notes);

            setLoading(false);
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to load reminder"
            );

            setLoading(false);
        }
    };

    const handleUpdateReminder =
        async () => {
            try {
                const response =
                    await fetch(
                        `http://192.168.1.5:5000/reminders/${id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type":
                                    "application/json",
                            },
                            body: JSON.stringify({
                                reminder,
                                notes,
                            }),
                        }
                    );

                const data =
                    await response.json();

                if (response.ok) {
                    Alert.alert(
                        "Success",
                        "Reminder updated successfully"
                    );

                    router.replace(
                        "/reminders"
                    );
                } else {
                    Alert.alert(
                        "Error",
                        data.message
                    );
                }
            } catch (error) {
                Alert.alert(
                    "Error",
                    "Failed to update reminder"
                );
            }
        };

    if (loading) {
        return (
            <ActivityIndicator
                size="large"
                style={{
                    marginTop: 50,
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Edit Reminder
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Reminder"
                value={reminder}
                onChangeText={setReminder}
            />

            <TextInput
                style={styles.input}
                placeholder="Notes"
                value={notes}
                onChangeText={setNotes}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={
                    handleUpdateReminder
                }
            >
                <Text
                    style={styles.buttonText}
                >
                    Update Reminder
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
            backgroundColor: "#fff",
        },

        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
        },

        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 12,
            marginBottom: 15,
        },

        button: {
            backgroundColor:
                "#007bff",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
        },

        buttonText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
        },
    });