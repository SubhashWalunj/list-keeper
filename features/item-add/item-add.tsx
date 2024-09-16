import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import useShowToast from "@/hooks/useShowToast";
import Item from "@/models/item";
import { ListPlus } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import ItemAddModal from "../item-editor-modal/item-editor-modal";
import useItemAddMutation from "./hooks/useItemAddMutation";

type ItemAddProps = {
  onSuccess: () => void;
  onError: () => void;
  onPending: (isPending: boolean) => void;
};

function ItemAdd({ onPending }: ItemAddProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const { mutate, isSuccess, isPending, isError } =
    useItemAddMutation("CURRENT");

  const handleItemAdd = useCallback(
    (item: Item) => {
      mutate(item);
      setModalOpen(false);
    },
    [mutate]
  );
  const showToast = useShowToast();

  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        showToast("item-add-success", "success", "Item Added :)");
      } else if (isError) {
        showToast("item-add-error", "error", "Error occurred (-_-)");
      } else {
      }
    }
  }, [isPending, isSuccess, isError, showToast]);

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
