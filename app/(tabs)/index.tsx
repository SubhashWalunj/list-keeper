import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ListCurrent from "@/features/list-current/list-current";
import ItemAdd from "@/features/item-add/item-add";
import { useCallback } from "react";

export default function HomeScreen() {
  const handleItemAddSuccess = useCallback(() => {
    console.log("Success");
  }, []);

  const handleItemAddError = useCallback(() => {
    console.log("Error");
  }, []);

  const handleItemAddPending = useCallback((isPending: boolean) => {
    console.log("Pending", isPending);
  }, []);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Hello Shopper!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ListCurrent></ListCurrent>
        </ThemedView>
      </ParallaxScrollView>
      <ItemAdd
        onPending={(isPending) => handleItemAddPending(isPending)}
        onSuccess={handleItemAddSuccess}
        onError={handleItemAddError}
      ></ItemAdd>
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
