import { Button, ButtonIcon } from "@/components/ui/button";
import { FileCheck2, FileX2 } from "lucide-react-native";
import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import useItemCheckMutation from "./hooks/useItemCheckMutation";
import useShowToast from "@/hooks/useShowToast";
import Item from "@/models/item";

type ItemCheckProps = {
  item: Item;
};

function ItemCheck({ item }: ItemCheckProps) {
  const checkButtonStyles = styles.checkButton;
  const { mutate, isError, isSuccess, isPending } = useItemCheckMutation();
  const showToast = useShowToast();

  const handleToggle = useCallback(() => {
    const updatedItem = { ...item, purchased: !item.purchased };
    mutate(updatedItem);
  }, [item, mutate]);

  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        showToast(
          "item-check-success",
          "success",
          `Item ${item.purchased ? "Checked" : "Unchecked"} :)`
        );
        return;
      }
      if (isError) {
        showToast("item-check-error", "error", "Error occurred (-_-)");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return (
    <Button
      size="lg"
      style={checkButtonStyles}
      className="rounded-full p-3.5"
      onPress={handleToggle}
    >
      <ButtonIcon stroke="black" as={item.purchased ? FileX2 : FileCheck2} />
    </Button>
  );
}

const styles = StyleSheet.create({
  checkButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
});

export default ItemCheck;
