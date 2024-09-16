import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ListCurrent from "@/features/list-current/list-current";
import ItemAdd from "@/features/item-add/item-add";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{
          light: Colors.light.primary,
          dark: Colors.dark.primary,
        }}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Hello Shopper!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ListCurrent></ListCurrent>
        </ThemedView>
      </ParallaxScrollView>
      <ItemAdd></ItemAdd>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
