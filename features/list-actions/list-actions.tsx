import ListActionConfirmDialog from "@/components/ListActionConfirmDialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { CircleArrowRight, ListCheck } from "lucide-react-native";
import { useEffect, useState } from "react";
import useItemsMoveToNext from "./hooks/useItemsMoveToNext";
import useShowToast from "@/hooks/useShowToast";
import useListMarkAsDone from "./hooks/useListMarkAsDone";

function ListActions() {
  const [actionType, setActionType] = useState<
    "move-to-next" | "mark-as-done" | undefined
  >();

  const {
    mutate: ItemMoveMutate,
    isError: itemMoveIsError,
    isSuccess: itemMoveIsSuccess,
    isPending: itemMoveIsPending,
  } = useItemsMoveToNext();
  const {
    mutate: listMarkAsDoneMutate,
    isError: listMarkAsDoneIsError,
    isSuccess: listMarkAsDoneIsSuccess,
    isPending: listMarkAsDoneIsPending,
  } = useListMarkAsDone();

  const showToast = useShowToast();

  const handleDialogClose = (confirm: boolean) => {
    setActionType(undefined);
    if (!confirm) return;

    if (actionType === "move-to-next") {
      ItemMoveMutate();
    } else if (actionType === "mark-as-done") {
      listMarkAsDoneMutate();
    }
  };

  useEffect(() => {
    if (!itemMoveIsPending) {
      if (itemMoveIsSuccess) {
        showToast(
          "items-move-to-next-success",
          "success",
          `Items moved to the next list & next list is now current list :)`
        );
        return;
      }
      if (itemMoveIsError) {
        showToast(
          "items-move-to-next-error",
          "error",
          "Error occurred while performing the action (-_-)"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemMoveIsPending]);

  useEffect(() => {
    if (!listMarkAsDoneIsPending) {
      if (listMarkAsDoneIsSuccess) {
        showToast(
          "list-mark-as-done-success",
          "success",
          "Current list marked as done & next list is now current list :)"
        );
        return;
      }
      if (listMarkAsDoneIsError) {
        showToast(
          "list-mark-as-done-error",
          "error",
          "Error occurred while performing the action (-_-)"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listMarkAsDoneIsPending]);

  return (
    <>
      <Menu
        placement="bottom left"
        offset={5}
        disabledKeys={["Settings"]}
        trigger={({ ...triggerProps }) => {
          return (
            <Button {...triggerProps}>
              <ButtonText>Actions</ButtonText>
            </Button>
          );
        }}
      >
        <MenuItem
          key="Move non-purchased to next"
          textValue="Move non-purchased to next"
          onPress={() => setActionType("move-to-next")}
        >
          <Icon as={CircleArrowRight} size="sm" className="mr-2" />
          <MenuItemLabel size="sm">Move non-purchased to next</MenuItemLabel>
        </MenuItem>
        <MenuItem
          key="Mark as done"
          textValue="Mark as done"
          onPress={() => setActionType("mark-as-done")}
        >
          <Icon as={ListCheck} size="sm" className="mr-2" />
          <MenuItemLabel size="sm">Mark as done</MenuItemLabel>
        </MenuItem>
      </Menu>
      {actionType && (
        <ListActionConfirmDialog
          actionType={actionType}
          onClose={handleDialogClose}
          show={Boolean(actionType)}
        />
      )}
    </>
  );
}

export default ListActions;
