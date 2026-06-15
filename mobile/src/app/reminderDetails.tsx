import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";

import {
    useLocalSearchParams,
    router,
} from "expo-router";

import { useQuery } from "@tanstack/react-query";

export default function ReminderDetails() {
    const { id } = useLocalSearchParams();

    const { data, isLoading, error } =
        useQuery({
            queryKey: ["reminder", id],
            queryFn: async () => {
                const response = await fetch(
                    `http://192.168.1.5:5000/reminders/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch reminder"
                    );
                }

                return response.json();
            },
            enabled: !!id,
        });

    const handleEdit = () => {
        router.push({
            pathname: "/editReminder",
            params: { id },
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://192.168.1.5:5000/reminders/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to delete reminder"
                );
            }

            Alert.alert(
                "Success",
                "Reminder deleted successfully"
            );

            router.replace("/reminders");
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to delete reminder"
            );
        }
    };

    if (isLoading) {
        return (
            <ActivityIndicator
                size="large"
                style={{ marginTop: 50 }}
            />
        );
    }

    if (error instanceof Error) {
        return (
            <Text style={styles.error}>
                {error.message}
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Reminder Details
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>
                    ID
                </Text>
                <Text style={styles.value}>
                    {data?.id}
                </Text>

                <Text style={styles.label}>
                    Reminder
                </Text>
                <Text style={styles.value}>
                    {data?.reminder}
                </Text>

                <Text style={styles.label}>
                    Notes
                </Text>
                <Text style={styles.value}>
                    {data?.notes}
                </Text>

                <Text style={styles.label}>
                    Completed
                </Text>
                <Text style={styles.value}>
                    {data?.completed
                        ? "Yes"
                        : "No"}
                </Text>

                <Text style={styles.label}>
                    User ID
                </Text>
                <Text style={styles.value}>
                    {data?.user_id}
                </Text>

                <Text style={styles.label}>
                    Created At
                </Text>
                <Text style={styles.value}>
                    {data?.created_at}
                </Text>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={handleEdit}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={handleDelete}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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

        card: {
            backgroundColor: "#f5f5f5",
            padding: 20,
            borderRadius: 10,
        },

        label: {
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 10,
            color: "#666",
        },

        value: {
            fontSize: 16,
            marginTop: 5,
            color: "#333",
        },

        buttonContainer: {
            flexDirection: "row",
            justifyContent:
                "space-between",
            marginTop: 25,
        },

        editButton: {
            flex: 1,
            backgroundColor:
                "#007bff",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
            marginRight: 10,
        },

        deleteButton: {
            flex: 1,
            backgroundColor:
                "#dc3545",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
        },

        buttonText: {
            color: "#fff",
            fontWeight: "bold",
        },

        error: {
            color: "red",
            textAlign: "center",
            marginTop: 50,
        },
    });