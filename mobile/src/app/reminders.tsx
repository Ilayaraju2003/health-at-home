import {
    ActivityIndicator,
    Text,
    FlatList,
    View,
} from "react-native";



import { useQuery } from "@tanstack/react-query";

import { getReminders } from "@/services/reminderService";

import ReminderListItem from "@/components/ReminderListItem";

import { Reminder } from "@/types/reminder";

import { router } from "expo-router";

export default function HomeScreen() {
    const {
        data,
        isLoading,
        error,
    } = useQuery<Reminder[]>({
        queryKey: ["reminders"],
        queryFn: getReminders,
    });

    if (isLoading) {
        return (
            <ActivityIndicator
                style={{ marginTop: "20%" }}
            />
        );
    }

    if (error instanceof Error) {
        return (
            <Text
                style={{
                    alignSelf: "center",
                    marginTop: "20%",
                }}
            >
                {error.message}
            </Text>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Text
                style={{
                    alignSelf: "center",
                    marginTop: "20%",
                }}
            >
                No reminders found
            </Text>
        );
    }

    const handleLogout = () => {
        router.replace("/login");
    };


    return (
        <FlatList
            data={data}
            keyExtractor={(item) =>
                item.id.toString()
            }
            renderItem={({ item }) => (
                <ReminderListItem
                    reminderItem={item}
                />
            )}
        />
    );
}
