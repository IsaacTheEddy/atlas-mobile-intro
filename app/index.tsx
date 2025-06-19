import { useActivitiesContext } from "@/components/ActivitiesProvider";
import { Link } from "expo-router";
import { Alert, Pressable, Text, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Activity } from "@/components/Activity";
import { SwipeableActivity } from "@/components/SwipeableActivity";

export default function Index() {
  const { activities, deleteActivities } = useActivitiesContext();
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlashList
          refreshing={false}
          renderItem={({ item }) => <SwipeableActivity activity={item} />}
          data={activities}
          estimatedItemSize={100}
          onRefresh={() => {
            Alert.alert("Refresh");
          }}
        />
      </View>

      <Link style={styles.links} href={"./add-activity-screen"} replace>
        <Text style={styles.text}>Add Activity</Text>
      </Link>
      <Pressable
        style={styles.buttons}
        onPress={() => {
          deleteActivities();
        }}
      >
        <Text style={styles.text}>Delte All Activities</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#FEF9E6",
  },
  links: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1ED2AF",
    width: "100%",
    padding: 16,
    textAlign: "center",
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
  text: {
    color: "white",
  },
  list: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
