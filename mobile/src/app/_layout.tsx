import { Stack, router } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  TouchableOpacity,
  Text,
} from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        {/* Login Screen */}
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />

        {/* Reminder List */}
        <Stack.Screen
          name="reminders"
          options={{
            title: "Reminders",
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  router.replace("/")
                }
                style={{
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        {/* Create Reminder */}
        <Stack.Screen
          name="createReminder"
          options={{
            title:
              "Create Reminder",
          }}
        />

        {/* Reminder Details */}
        <Stack.Screen
          name="reminderDetails"
          options={{
            title: "Reminder Details",
          }}
        />

        <Stack.Screen
          name="editReminder"
          options={{
            title: "Edit Reminder",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}