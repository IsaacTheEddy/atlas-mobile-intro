import { Activities } from "@/hooks/useActivities";
import { Text, StyleSheet, View } from "react-native";

interface Activity {
  id: number;
  steps: number;
  date: number;
}

export function Activity({ activity }: { activity: Activity }) {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.date}>
          {new Date(activity.date).toLocaleDateString()},{" "}
          {new Date(activity.date).toLocaleTimeString()}
        </Text>
        <Text style={styles.steps}>{activity.steps} steps on</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    verticalAlign: "bottom",
    width: "100%",
    height: 100,
  },
  view: {
    width: "100%",
    height: 50,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
    flex: 1,
  },
  date: {
    flex: 0,
    marginBottom: 15,
  },
  steps: {
    flex: 0,
    fontSize: 25,
  },
});
