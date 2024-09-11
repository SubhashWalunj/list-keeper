import { Button, ButtonIcon } from "@/components/ui/button";
import { Colors } from "@/constants/Colors";
import { FileCheck2, FileX2 } from "lucide-react-native";
import { StyleSheet, useColorScheme } from "react-native";

type ItemCheckProps = {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
};

function ItemCheck({ isChecked }: ItemCheckProps) {
  let checkButtonStyles = styles.checkButton;
  const theme = useColorScheme() || "light";
  /* if (isChecked) {
    checkButtonStyles = {
      ...checkButtonStyles,
      backgroundColor: Colors[theme].primary,
    };
  } */
  return (
    <Button size="lg" style={checkButtonStyles} className="rounded-full p-3.5">
      <ButtonIcon stroke="black" as={isChecked ? FileX2 : FileCheck2} />
    </Button>
  );
}

const styles = StyleSheet.create({
  checkButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
});

export default ItemCheck;
