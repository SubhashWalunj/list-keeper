import { Button, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { ArrowBigRightDash, Ellipsis, ListX } from "lucide-react-native";
import Item from "@/models/item";
import { useCallback, useEffect, useState } from "react";
import useItemRemoveMutation from "./hooks/useItemRemoveMutation";
import useShowToast from "@/hooks/useShowToast";
import useItemMoveToNextMutation from "./hooks/useItemMoveToNextMutation";
import { ListTypes } from "@/models/list";

type ItemActionsProps = {
  listType: ListTypes;
  item: Item;
};

function ItemActions({ listType, item }: ItemActionsProps) {
  const [isRemoveItemDisabled, setIsRemoveItemDisabled] = useState(false);
  const [isMoveItemDisabled, setIsMoveItemDisabled] = useState(false);
  const {
    mutate: itemRemoveMutate,
    isError: itemRemoveIsError,
    isPending: itemRemoveIsPending,
    isSuccess: itemRemoveIsSuccess,
  } = useItemRemoveMutation(listType);
  const {
    mutate: itemMoveMutate,
    isError: itemMoveIsError,
    isPending: itemMoveIsPending,
    isSuccess: itemMoveIsSuccess,
  } = useItemMoveToNextMutation();
  const showToast = useShowToast();

  const handleRemoveItem = useCallback(() => {
    setIsRemoveItemDisabled(true);
    itemRemoveMutate(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleMoveToNext = useCallback(() => {
    setIsMoveItemDisabled(true);
    itemMoveMutate(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (!itemRemoveIsPending) {
      if (itemRemoveIsSuccess) {
        showToast("item-remove-success", "success", `Item removed :)`);
        return;
      }
      if (itemRemoveIsError) {
        showToast(
          "item-remove-error",
          "error",
          "Error occurred while removing an item (-_-)"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemRemoveIsPending]);

  useEffect(() => {
    if (!itemMoveIsPending) {
      if (itemMoveIsSuccess) {
        showToast("item-move-success", "success", `Item moved to next list :)`);
        return;
      }
      if (itemMoveIsError) {
        showToast(
          "item-move-error",
          "error",
          "Error occurred while moving an item (-_-)"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemMoveIsPending]);

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
      {listType === "current" && (
        <MenuItem
          key="Move to next"
          textValue="Move to next"
          onPress={handleMoveToNext}
          disabled={isMoveItemDisabled}
        >
          <Icon as={ArrowBigRightDash} size="md" className="mr-2" />
          <MenuItemLabel size="md">Move to next</MenuItemLabel>
        </MenuItem>
      )}
      <MenuItem
        key="Remove"
        textValue="Remove"
        onPress={handleRemoveItem}
        disabled={isRemoveItemDisabled}
      >
        <Icon as={ListX} size="md" className="mr-2" />
        <MenuItemLabel size="md">Remove</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}

export default ItemActions;
