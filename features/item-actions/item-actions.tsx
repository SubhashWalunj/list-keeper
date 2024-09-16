import { Button, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { ArrowBigRightDash, Ellipsis, ListX } from "lucide-react-native";
import Item from "@/models/item";
import { useCallback, useEffect, useState } from "react";
import useItemRemoveMutation from "./hooks/useItemRemoveMutation";
import useShowToast from "@/hooks/useShowToast";

type ItemActionsProps = {
  item: Item;
};

function ItemActions({ item }: ItemActionsProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate, isError, isPending, isSuccess } = useItemRemoveMutation();
  const showToast = useShowToast();

  const handleRemoveItem = useCallback(() => {
    console.log("Remove item", item);
    setIsDisabled(true);
    mutate(item);
  }, [item, mutate]);

  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        showToast("item-remove-success", "success", `Item removed :)`);
        return;
      }
      if (isError) {
        showToast(
          "item-remove-error",
          "error",
          "Error occurred while removing an item (-_-)"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return (
    <Menu
      placement="bottom"
      offset={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} variant="solid">
            <ButtonIcon stroke="white" as={Ellipsis}></ButtonIcon>
          </Button>
        );
      }}
    >
      <MenuItem key="Move to next" textValue="Move to next">
        <Icon as={ArrowBigRightDash} size="md" className="mr-2" />
        <MenuItemLabel size="md">Move to next</MenuItemLabel>
      </MenuItem>
      <MenuItem
        key="Remove"
        textValue="Remove"
        onPress={handleRemoveItem}
        disabled={isDisabled}
      >
        <Icon as={ListX} size="md" className="mr-2" />
        <MenuItemLabel size="md">Remove</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}

export default ItemActions;
