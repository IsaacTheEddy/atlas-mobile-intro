import { Activities } from "@/hooks/useActivities";
import { Activity } from "./Activity";
import { Text, StyleSheet, View, Alert, Pressable } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useActivitiesContext } from "./ActivitiesProvider";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface SwipeActivity {
  id: number;
  steps: number;
  date: number;
}

export function SwipeableActivity({ activity }: { activity: SwipeActivity }) {
  const { deleteActivity } = useActivitiesContext();
  return (
    <View key={activity.id} style={styles.view}>
      <Swipeable
        containerStyle={styles.swipeable}
        friction={3}
        rightThreshold={40}
        leftThreshold={40}
        renderLeftActions={() => <Action activity={activity} text="Delete" />}
        renderRightActions={() => <Action activity={activity} text="Delete" />}
        onSwipeableOpen={() => {
          deleteActivity(activity.id);
        }}
      >
        <Activity activity={activity} />
      </Swipeable>
    </View>
  );
}

export const Action = ({
  text,
  activity,
}: {
  text: string;
  activity: SwipeActivity;
}) => {
  return (
    <Swipeable>
      <Text style={styles.actionText}>{text}</Text>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    fontSize: 25,
    margin: 15,
  },
  view: {
    flex: 1,
    fontSize: 25,
    margin: 15,
    marginTop: "10%",
    justifyContent: "center",
    zIndex: 1,
  },
  actionView: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: "red",
    borderWidth: 2,
    width: 50,
    height: 100,
    zIndex: 0,
  },
  actionText: {
    color: "black",
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    borderWidth: 1,
    alignItems: "flex-start",
  },
});
