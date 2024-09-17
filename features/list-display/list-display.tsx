import { ThemedText } from "@/components/ThemedText";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import ItemActions from "../item-actions/item-actions";
import ItemCheck from "../item-check/item-check";
import List, { ListTypes } from "@/models/list";
import { sortItems } from "@/utility/list";

type ListDisplayProps = {
  listType: ListTypes;
  listData: List | null | undefined;
  error: Error | null;
};

function ListDisplay({ listType, listData, error }: ListDisplayProps) {
  if (error) {
    console.log(error);
    return (
      <ThemedText>An Error occurred to fetch the {listType} list</ThemedText>
    );
  }

  return listData && listData.items.length ? (
    sortItems(listData.items).map((item, index) => (
      <React.Fragment key={index}>
        <Card
          size="md"
          variant="outline"
          className="m-3"
          style={item.purchased && { backgroundColor: "#208b3a" }}
        >
          <View style={styles.itemContainer}>
            {listType === "current" && <ItemCheck item={item}></ItemCheck>}
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
            <ItemActions listType={listType} item={item}></ItemActions>
          </View>
        </Card>
      </React.Fragment>
    ))
  ) : (
    <Alert action="info" variant="solid" style={{ marginTop: 10 }}>
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

export default ListDisplay;
