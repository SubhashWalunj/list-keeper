import { ThemedText } from "@/components/ThemedText";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Item from "@/models/item";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import ItemActions from "../item-actions/item-actions";
import ItemCheck from "../item-check/item-check";
import useCurrentListData from "./hooks/useCurrentList";

const sortItems = (items: Item[]) =>
  items.sort((a, b) => {
    // Sort purchased: false on top
    if (a.purchased !== b.purchased) {
      return a.purchased ? 1 : -1;
    }
    // If both are either purchased: true or purchased: false, sort by name
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

function ListCurrent() {
  const { error, data } = useCurrentListData();

  if (error) {
    console.log(error);
    return <ThemedText>An Error occurred to fetch the current list</ThemedText>;
  }

  return data ? (
    sortItems(data.items).map((item, index) => (
      <React.Fragment key={index}>
        <Card
          size="md"
          variant="outline"
          className="m-3"
          style={item.purchased && { backgroundColor: "#208b3a" }}
        >
          <View style={styles.itemContainer}>
            <ItemCheck item={item}></ItemCheck>
            <ThemedText
              style={{
                fontWeight: "bold",
                ...(item.purchased && { color: "white" }),
              }}
            >
              {item.name}
            </ThemedText>

            {item.quantity > 1 && (
              <Badge
                style={{ borderRadius: 999 }}
                size="sm"
                variant="outline"
                action="info"
              >
                <BadgeText>
                  {item.quantity}
                  {item.unit !== "numbers" && ` ${item.unit}`}
                </BadgeText>
              </Badge>
            )}
            <ItemActions></ItemActions>
          </View>
        </Card>
      </React.Fragment>
    ))
  ) : (
    <Alert action="info" variant="solid">
      <AlertIcon stroke="black" as={InfoIcon} />
      <AlertText>
        There is no item present in the list. Use Add Item button to add new
        item.
      </AlertText>
    </Alert>
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
