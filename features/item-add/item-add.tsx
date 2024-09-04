import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { ListPlus } from "lucide-react-native";

function ItemAdd() {
  return (
    <Fab
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
    >
      <FabIcon stroke="white" as={ListPlus} />
      <FabLabel>Add Item</FabLabel>
    </Fab>
  );
}

export default ItemAdd;
