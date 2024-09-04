import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@/components/ui/card";
import { useFirebase } from "@/hooks/useFirebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ItemCheck from "../item-check/item-check";

function ListCurrent() {
  const db = useFirebase();
  const [items, setItems] = useState<item[]>([]);

  useEffect(() => {
    console.log("useEffect", items);
    async function getCurrentList() {
      const querySnapshot = await getDocs(collection(db, "groceryLists"));
      querySnapshot.forEach((doc) => {
        setItems(doc.data().itemsArr);
      });
    }
    getCurrentList();
  }, []);

  return items.map((item, index) => (
    <React.Fragment key={index}>
      <Card size="md" variant="outline" className="m-3">
        <ThemedView style={styles.itemContainer}>
          <ItemCheck></ItemCheck>
          <ThemedText>{item.name}</ThemedText>
        </ThemedView>
      </Card>
    </React.Fragment>
  ));
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListCurrent;
