import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import { Reminder } from "@/types/reminder";

interface ReminderListItemProps {
  reminderItem: Reminder;
}

export default function ReminderListItem({
  reminderItem,
}: ReminderListItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {reminderItem.reminder}
        </Text>

        {reminderItem.notes ? (
          <Text
            style={{
              fontSize: 13,
              color: "gray",
              marginTop: 3,
            }}
          >
            {reminderItem.notes}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/reminderDetails",
            params: {
              id: reminderItem.id,
            },
          })
        }
      >
        <AntDesign
          name="info-circle"
          size={17} color="#FF8C00"
          style={{
            alignSelf: "flex-start",
            marginLeft: "auto", marginRight: 5,
          }}
          onPress={() => router.push({ pathname: "/reminderDetails", params: { id: reminderItem.id, }, })} />
      </TouchableOpacity>
    </View>
  );
}