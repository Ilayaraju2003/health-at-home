import { router, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TouchableOpacity, Text } from "react-native";

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
        }}
      >
        {/* Login Page */}
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
          }}
        />

        {/* Reminders Page */}
        <Stack.Screen
          name="reminders"
          options={{
            title: "Reminders",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.replace("/")}
                style={{ marginRight: 10 }}
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
      </Stack>
    </QueryClientProvider>
  );
}