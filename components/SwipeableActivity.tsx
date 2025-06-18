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

interface RightSwipeActionProps {
  progress: SharedValue<number>;
  dragX: SharedValue<number>;
  onPress: () => void;
}

export function SwipeableActivity({ activity }: { activity: SwipeActivity }) {
  const { deleteActivity } = useActivitiesContext();

  const handleDelete = () => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteActivity(activity.id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={3}
      rightThreshold={40}
      leftThreshold={40}
      renderLeftActions={(process, dragx) => (
        <RightSwipeAction
          progress={process}
          dragX={dragx}
          onPress={handleDelete}
        />
      )}
      renderRightActions={(progress, dragX) => (
        <RightSwipeAction
          progress={progress}
          dragX={dragX}
          onPress={handleDelete}
        />
      )}
    >
      <View key={activity.id} style={styles.view}>
        <Activity activity={activity} />
      </View>
    </ReanimatedSwipeable>
  );
}

export const RightSwipeAction: React.FC<RightSwipeActionProps> = ({
  progress,
  dragX,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = dragX.value > 0 ? 0 : Math.abs(dragX.value);
    const containerWidth = progress.value * 100;

    return {
      width: Math.max(0, containerWidth),
      opacity: progress.value,
    };
  });

  return (
    <Reanimated.View style={[styles.actionButtonContainer, animatedStyle]}>
      <Pressable onPress={onPress} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Delete</Text>
      </Pressable>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    fontSize: 25,
    marginTop: "10%",
    justifyContent: "center",
    backgroundColor: "white", // Ensure your content has a background
    paddingHorizontal: 15,
  },
  swipeable: {
    height: 100, // Define a fixed height for the swipeable row
    alignItems: "stretch", // Stretch children to fill height
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "transparent", // The background of the swipeable is transparent, actions fill it
  },
  leftAction: {
    flex: 1, // Let it fill the space available
    justifyContent: "center",
    alignItems: "flex-start", // Align text to the start
    backgroundColor: "lightgray", // Example background for left action
    paddingHorizontal: 20,
  },
  actionText: {
    color: "black",
    fontWeight: "bold",
  },
  // New styles for the right action button
  actionButtonContainer: {
    backgroundColor: "red", // Background for the container that expands
    justifyContent: "center",
    alignItems: "flex-end", // Align button content to the end (right)
    paddingHorizontal: 10,
    overflow: "hidden", // Hide content that overflows during animation
    // The width will be animated by useAnimatedStyle, so don't set it here initially
  },
  actionButton: {
    // Make the Pressable fill its container within the animated view
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 80, // A fixed width for the button's visible part
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
