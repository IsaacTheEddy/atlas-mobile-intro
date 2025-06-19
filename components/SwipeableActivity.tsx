import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Activity } from "./Activity";
import { Activities } from "@/hooks/useActivities";
import { useActivitiesContext } from "./ActivitiesProvider";

export const SwipeableActivity = ({ activity }: { activity: Activities }) => {
  const { deleteActivity } = useActivitiesContext();

  const handleDelete = () => {
    deleteActivity(activity.id);
  };

  // Function to render the action
  const LeftActions = () => {
    return (
      <TouchableOpacity
        style={[styles.action, styles.leftAction]}
        onPress={handleDelete}
      >
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const RightActions = () => {
    return (
      <TouchableOpacity
        style={[styles.action, styles.rightAction]}
        onPress={handleDelete}
      >
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Swipeable
        renderLeftActions={LeftActions}
        renderRightActions={RightActions}
      >
        <View style={styles.swipeableContent}>
          <Activity activity={activity} />
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  swipeableContent: {
    backgroundColor: "#fff",
    borderWidth: 2,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
  },
  rightAction: {
    backgroundColor: "#ff3b30",
    borderLeftWidth: 0,
    borderWidth: 3,
  },
  leftAction: {
    backgroundColor: "#34c759",
    borderRightWidth: 0,
    borderWidth: 3,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
});
