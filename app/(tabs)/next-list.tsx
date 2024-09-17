import { StyleSheet, Image, Platform } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import ItemAdd from "@/features/item-add/item-add";
import ListDisplay from "@/features/list-display/list-display";
import useNextListData from "@/hooks/useNextList";
import Header from "@/components/Header";

export default function TabTwoScreen() {
  const { error, data } = useNextListData();
  return (
    <>
      <Header />
      <ParallaxScrollView
        headerBackgroundColor={{
          light: Colors.light.primary,
          dark: Colors.dark.primary,
        }}
      >
        <ThemedView style={styles.stepContainer}>
          <ListDisplay
            listType="next"
            listData={data}
            error={error}
          ></ListDisplay>
        </ThemedView>
      </ParallaxScrollView>
      <ItemAdd listType="next"></ItemAdd>
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
    paddingTop: 30,
  },
});
