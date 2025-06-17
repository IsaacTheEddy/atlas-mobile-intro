import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useActivitiesContext } from "@/components/ActivitiesProvider";

export default function activityScreen() {
  const [steps, setSteps] = useState<number>(0);
  const { insertActivity } = useActivitiesContext();
  return (
    <View style={styles.container}>
      <Text>Activity Screen</Text>
      <TextInput
        placeholder="Enter steps"
        keyboardType="number-pad"
        onChangeText={(value) => setSteps(parseInt(value))}
      />
      <Pressable
        style={styles.addAct}
        onPress={() => {
          insertActivity(steps, new Date());
          router.push("/");
        }}
      >
        <Text style={styles.text}>Add Activity</Text>
      </Pressable>

      <Link style={styles.buttons} href={"/"} replace>
        <Text style={styles.text}>Go Back</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
    padding: 16,
    textAlign: "center",
  },
  addAct: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: "100%",
    padding: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    color: "white",
  },
});
