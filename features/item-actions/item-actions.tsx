import { Button, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { ArrowBigRightDash, Ellipsis, ListX } from "lucide-react-native";

function ItemActions() {
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
      <MenuItem key="Move to next" textValue="Move to next">
        <Icon as={ArrowBigRightDash} size="md" className="mr-2" />
        <MenuItemLabel size="md">Move to next</MenuItemLabel>
      </MenuItem>
      <MenuItem key="Remove" textValue="Remove">
        <Icon as={ListX} size="md" className="mr-2" />
        <MenuItemLabel size="md">Remove</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}

export default ItemActions;
