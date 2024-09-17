import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text"; // Add this line to import Text

type ListActionConfirmDialogProps = {
  actionType: "move-to-next" | "mark-as-done";
  show: boolean;
  onClose: (confirm: boolean) => void;
};

function ListActionConfirmDialog({
  actionType,
  show,
  onClose,
}: ListActionConfirmDialogProps) {
  const headingText =
    actionType === "move-to-next"
      ? "Move non-purchased to next"
      : "Mark as done";

  const bodyText =
    actionType === "move-to-next"
      ? "This action will move non-purchased items to the Next list and mark the Current list as done. Next list will become current list."
      : "This action will remove non-purchased items from the Current list and mark it as done. Next list will become current list.";

  return (
    <AlertDialog isOpen={show} onClose={() => onClose(false)} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            {headingText}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">{bodyText}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="mt-5">
          <Button
            variant="outline"
            action="secondary"
            onPress={() => onClose(false)}
            size="sm"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" onPress={() => onClose(true)}>
            <ButtonText>Confirm</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ListActionConfirmDialog;
