import { Activities } from "@/hooks/useActivities";
import { Activity } from "./Activity";
import { Text, StyleSheet, View, Alert, Pressable } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useActivitiesContext } from "./ActivitiesProvider";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface SwipeActivity {
  id: number;
  steps: number;
  date: number;
}

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.Action}>Text</Text>
    </Reanimated.View>
  );
}
function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value - 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.Action}>Text</Text>
    </Reanimated.View>
  );
}

export function SwipeableActivity({ activity }: { activity: SwipeActivity }) {
  const { deleteActivity } = useActivitiesContext();
  return (
    <View key={activity.id} style={styles.view}>
      <ReanimatedSwipeable
        containerStyle={styles.swipeable}
        friction={3}
        rightThreshold={40}
        leftThreshold={40}
        renderLeftActions={LeftAction}
        renderRightActions={RightAction}
        onSwipeableOpen={() => {
          deleteActivity(activity.id);
        }}
      >
        <Text>
          {new Date(activity.date).toLocaleDateString()},{" "}
          {new Date(activity.date).toLocaleTimeString()}
        </Text>
        <Text>{activity.steps} steps on</Text>
      </ReanimatedSwipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    fontSize: 25,
    margin: 15,
    marginTop: "10%",
    justifyContent: "center",
  },
  Action: { height: 100, backgroundColor: "red", width: 50 },
  swipeable: {
    height: 100,
    alignItems: "flex-start",
    borderWidth: 1,
  },
});
