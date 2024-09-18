import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import ItemAdd from "@/features/item-add/item-add";
import Colors from "@/constants/Colors";
import useCurrentListData from "@/hooks/useCurrentList";
import ListDisplay from "@/features/list-display/list-display";
import Header from "@/components/Header";
import ListActions from "@/features/list-actions/list-actions";

export default function HomeScreen() {
  const { error, data } = useCurrentListData();
  return (
    <>
      <Header>
        <ListActions></ListActions>
      </Header>
      <ParallaxScrollView
        headerBackgroundColor={{
          light: Colors.light.primary,
          dark: Colors.dark.primary,
        }}
      >
        <ThemedView style={styles.stepContainer}>
          <ListDisplay
            listType="current"
            listData={data}
            error={error}
          ></ListDisplay>
        </ThemedView>
      </ParallaxScrollView>
      <ItemAdd listType="current"></ItemAdd>
    </>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingTop: 30,
  },
});
