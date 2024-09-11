import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { ListPlus } from "lucide-react-native";
import ItemAddModal from "../item-editor-modal/item-editor-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import useItemAddMutation from "./hooks/useItemAddMutation";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

type ItemAddProps = {
  onSuccess: () => void;
  onError: () => void;
  onPending: (isPending: boolean) => void;
};

function ItemAdd({ onSuccess, onError, onPending }: ItemAddProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const { mutate, isSuccess, isPending, isError } =
    useItemAddMutation("CURRENT");

  const handleItemAdd = useCallback((item: Item) => {
    mutate(item);
    setModalOpen(false);
  }, []);
  const toast = useToast();

  const showToast = useCallback(
    (action: "success" | "error", message: string) => {
      toast.show({
        id: Date.now().toString(),
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action={action} variant="solid">
              <ToastTitle>{message}</ToastTitle>
            </Toast>
          );
        },
      });
    },
    []
  );

  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        showToast("success", "Item Added :)");
      } else if (isError) {
        showToast("error", "Error occurred (-_-)");
      } else {
      }
    }
    onPending(isPending);
  }, [isPending]);

  return (
    <>
      <ItemAddModal
        showModal={modalOpen}
        listType="CURRENT"
        editType="NEW"
        closeModal={() => setModalOpen(false)}
        addItem={handleItemAdd}
      ></ItemAddModal>
      <Fab
        size="md"
        ref={ref}
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => setModalOpen(true)}
      >
        <FabIcon stroke="white" as={ListPlus} />
        <FabLabel>Add Item</FabLabel>
      </Fab>
    </>
  );
}

export default ItemAdd;
