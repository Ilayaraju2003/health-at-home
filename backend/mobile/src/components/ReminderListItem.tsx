import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";

import { MaterialCommunityIcons, AntDesign, } from "@expo/vector-icons";

import { useState } from "react";

import { Reminder } from "@/types/reminder";

interface ReminderListItemProps { reminderItem: Reminder; }

export default function ReminderListItem({
  reminderItem,
}: ReminderListItemProps) {
  const [isCompleted, setIsCompleted] =
    useState(reminderItem.completed);

  return (
    <TouchableOpacity
      onPress={() =>
        setIsCompleted(!isCompleted)
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderBottomWidth:
          StyleSheet.hairlineWidth,
        borderBottomColor: "grey",
        marginBottom: 20,
        paddingBottom: 10,
        paddingHorizontal: 15,
      }}
    >
      {isCompleted ? (
        <MaterialCommunityIcons
          name="circle-slice-8"
          size={22}
          color="#FF8C00"
          style={{
            alignSelf: "flex-start",
          }}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-circle-outline"
          size={22}
          color="grey"
          style={{
            alignSelf: "flex-start",
          }}
        />
      )}

      <View
        style={{
          gap: 5,
          flexShrink: 1,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {reminderItem.reminder}
        </Text>

        {!!reminderItem.notes && (
          <Text
            style={{
              fontSize: 12,
              color: "grey",
            }}
          >
            {reminderItem.notes}
          </Text>
        )}
      </View>

      <AntDesign
        name="info-circle"
        size={17}
        color="#FF8C00"
        style={{
          alignSelf: "flex-start",
          marginLeft: "auto",
          marginRight: 5,
        }}
        onPress={() =>
          console.log("Navigate to edit")
        }
      />
    </TouchableOpacity>
  );
}