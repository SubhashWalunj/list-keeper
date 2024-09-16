import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import Item from "@/models/item";
import { produce } from "immer";
import { AlertCircleIcon, ChevronDownIcon } from "lucide-react-native";
import { useCallback, useState } from "react";

type QuantityUnits = "numbers" | "kg" | "ml" | "l";

type ItemEditorProps = {
  values: Item;
  onInputChange: (values: Item) => void;
};

type FormInput<T> = {
  value: T;
  isInvalid: boolean;
  isDirty: boolean;
};

type ItemEditorFormType = {
  name: FormInput<string>;
  quantity: FormInput<number>;
  unit: FormInput<QuantityUnits>;
};

function ItemEditorForm({ values, onInputChange }: ItemEditorProps) {
  const [showQuantity, setShowQuantity] = useState(false);
  const [form, setForm] = useState<ItemEditorFormType>({
    name: {
      value: values.name,
      isInvalid: true,
      isDirty: false,
    },
    quantity: {
      value: values.quantity,
      isInvalid: false,
      isDirty: false,
    },
    unit: {
      value: values.unit as QuantityUnits,
      isInvalid: false,
      isDirty: false,
    },
  });

  const handleInputChange = useCallback(
    <T extends keyof ItemEditorFormType>(
      key: T,
      input: ItemEditorFormType[T]
    ) => {
      const formValues: Item = {
        name: form.name.value,
        quantity: form.quantity.value,
        unit: form.unit.value,
      };
      setForm(
        produce((draft) => {
          draft[key] = input;
        })
      );
      onInputChange({ ...formValues, [key]: input.value });
    },
    [form, onInputChange]
  );

  return (
    <>
      <FormControl
        isInvalid={form.name.isDirty && form.name.isInvalid}
        isRequired
      >
        <FormControlLabel className="mb-1">
          <FormControlLabelText>Item Name</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={form.name.value}
            placeholder="Enter item name"
            onChangeText={(value) =>
              handleInputChange("name", {
                value,
                isInvalid: !value,
                isDirty: true,
              })
            }
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon size="sm" as={AlertCircleIcon} />
          <FormControlErrorText>Item name is required.</FormControlErrorText>
        </FormControlError>
      </FormControl>

      {!showQuantity && (
        <Button
          size="sm"
          variant="outline"
          action="secondary"
          onPress={() => setShowQuantity(true)}
          style={{ alignSelf: "flex-start", marginTop: 10 }}
        >
          <ButtonText>Add Quantity</ButtonText>
        </Button>
      )}
      {showQuantity && (
        <>
          <FormControl isInvalid={form.quantity.isInvalid}>
            <FormControlLabel className="mb-1">
              <FormControlLabelText>How many?</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                value={String(form.quantity.value)}
                placeholder="Enter quantity"
                onChangeText={(value) =>
                  handleInputChange("quantity", {
                    value: Number(value),
                    isInvalid: !value,
                    isDirty: true,
                  })
                }
              />
            </Input>
          </FormControl>
          <FormControl isInvalid={form.unit.isInvalid}>
            <FormControlLabel className="mb-1">
              <FormControlLabelText>Unit</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue="Number(s)"
              onValueChange={(value) =>
                handleInputChange("unit", {
                  value: value as QuantityUnits,
                  isInvalid: !value,
                  isDirty: true,
                })
              }
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select unit" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Number(s)" value="numbers" />
                  <SelectItem label="Kg" value="kg" />
                  <SelectItem label="Liters" value="l" />
                  <SelectItem label="Ml" value="ml" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
}

export default ItemEditorForm;
