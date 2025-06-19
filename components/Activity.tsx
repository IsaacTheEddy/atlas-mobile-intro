import { Activities } from "@/hooks/useActivities";
import { Text, StyleSheet, View } from "react-native";

export function Activity({ activity }: { activity: Activities }) {
  return (
    <View style={styles.activityLayout}>
      <View style={styles.stepsDate}>
        <Text>
          {new Date(activity.date).toLocaleDateString()},{" "}
          {new Date(activity.date).toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.stepsView}>
        <Text style={styles.steps}>Steps: {activity.steps}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityLayout: {
    flex: 1,
    width: "100%",
    margin: 5,
  },
  stepsDate: {
    flex: 1,
    fontWeight: 400,
  },

  stepsView: {
    flex: 2,
    justifyContent: "center",
    width: "auto",
  },

  steps: {
    flex: 1,
    fontSize: 25,
    fontWeight: 400,
  },
});
