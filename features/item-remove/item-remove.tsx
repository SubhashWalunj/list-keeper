import { Icon } from "@/components/ui/icon";
import { MenuItem, MenuItemLabel } from "@/components/ui/menu";
import Item from "@/models/item";
import { ListX } from "lucide-react-native";

interface ItemRemoveProps {
  item: Item;
}

const ItemRemove: React.FC<ItemRemoveProps> = ({ item }: ItemRemoveProps) => {
  const handleRemoveItem = () => {
    console.log("Remove item", item);
  };
  return (
    <MenuItem key="Remove" textValue="Remove" onPress={handleRemoveItem}>
      <Icon as={ListX} size="md" className="mr-2" />
      <MenuItemLabel size="md">Remove</MenuItemLabel>
    </MenuItem>
  );
};

export default ItemRemove;
