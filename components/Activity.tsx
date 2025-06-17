import { Activities } from "@/hooks/useActivities";
import { Text, StyleSheet, View } from "react-native";

interface Activity {
  id: number;
  steps: number;
  date: number;
}

export function Activity({ activity }: { activity: Activity }) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 100,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  date: {
    marginBottom: 15,
  },
  steps: {
    fontSize: 25,
  },
});
