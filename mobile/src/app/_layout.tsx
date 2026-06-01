import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

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
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="index"
          options={{
            title: "Reminders",
          }}
        />

        <Stack.Screen
          name="createUpdateReminder"
          options={{
            presentation: "modal",
            title: "Create Reminder",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}