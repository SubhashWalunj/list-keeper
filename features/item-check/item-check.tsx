import { Button, ButtonIcon } from "@/components/ui/button";
import { FileCheck2 } from "lucide-react-native";
import { StyleSheet } from "react-native";

function ItemCheck() {
  return (
    <Button size="lg" style={styles.checkButton} className="rounded-full p-3.5">
      <ButtonIcon stroke="black" as={FileCheck2} />
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
