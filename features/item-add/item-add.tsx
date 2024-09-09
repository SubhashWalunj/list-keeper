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
  }, []);
  const toast = useToast();
  const [toastId, setToastId] = useState(Date.now().toString());

  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        onSuccess();
      } else if (isError) {
        onError();
      } else {
        if (!toast.isActive(toastId)) {
          const newId = Date.now().toString();
          setToastId(newId);
          toast.show({
            id: newId,
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
              const uniqueToastId = "toast-" + id;
              return (
                <Toast nativeID={uniqueToastId} action="error" variant="solid">
                  <ToastTitle>Error</ToastTitle>
                  <ToastDescription>
                    Failed to add new item to the list. Please try again.
                  </ToastDescription>
                </Toast>
              );
            },
          });
        }
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
