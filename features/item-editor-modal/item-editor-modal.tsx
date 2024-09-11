import React, { useCallback, useMemo, useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Divider } from "@/components/ui/divider";
import ItemEditorForm from "../item-editor-form/item-editor-form";
import type { ListTypes } from "@/models/list";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";

type EditType = "NEW" | "UPDATE";

type ItemAddModalProps = {
  showModal: boolean;
  listType: ListTypes;
  editType: EditType;
  closeModal: () => void;
  addItem: (values: Item) => void;
};

function ItemAddModal({
  showModal,
  listType,
  editType,
  closeModal,
  addItem,
}: ItemAddModalProps) {
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [newItem, setNewItem] = useState<Item>();
  const toast = useToast();

  const handleItemAdd = () => {
    if (newItem) {
      addItem(newItem);
      return;
    }
    toast.show({
      id: Date.now().toString(),
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="warning" variant="solid">
            <ToastTitle>Please fill up the form.</ToastTitle>
          </Toast>
        );
      },
    });
  };

  const formValues: Item = useMemo(() => {
    if (editType === "NEW") {
      return {
        name: "",
        quantity: 1,
        unit: "numbers",
      };
    }
    return {
      name: "Something",
      quantity: 1,
      unit: "numbers",
    };
  }, []);

  const handleInputChange = useCallback((formValues: Item) => {
    setIsFormInvalid(!Boolean(formValues.name));
    setNewItem(formValues);
  }, []);

  return (
    <Modal
      isOpen={showModal}
      closeOnOverlayClick={false}
      onClose={closeModal}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Add a item in the{" "}
            {`${listType === "CURRENT" ? "Current" : "Next"} ` || ""}list
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ItemEditorForm
            values={formValues}
            onInputChange={handleInputChange}
          ></ItemEditorForm>
        </ModalBody>
        <Divider className="mb-5" />
        <ModalFooter>
          <Button variant="outline" action="secondary" onPress={closeModal}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button isDisabled={isFormInvalid} onPress={handleItemAdd}>
            <ButtonText>Add</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ItemAddModal;
