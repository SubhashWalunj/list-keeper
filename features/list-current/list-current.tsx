import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@/components/ui/card";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ItemCheck from "../item-check/item-check";
import ItemActions from "../item-actions/item-actions";
import db from "@/utility/firebase";
import useCurrentListData from "./hooks/useCurrentList";

function ListCurrent() {
  const { error, data } = useCurrentListData();

  return data ? (
    data.items.map((item, index) => (
      <React.Fragment key={index}>
        <Card size="md" variant="outline" className="m-3">
          <ThemedView style={styles.itemContainer}>
            <ItemCheck></ItemCheck>
            <ThemedText>{item.name}</ThemedText>
            <ItemActions></ItemActions>
          </ThemedView>
        </Card>
      </React.Fragment>
    ))
  ) : (
    <ThemedText>An Error occurred to fetch the current list</ThemedText>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListCurrent;
