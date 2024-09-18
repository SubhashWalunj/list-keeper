import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { HelloWave } from "./HelloWave";
import Colors from "@/constants/Colors";
import { PropsWithChildren } from "react";

const Header = ({ children }: PropsWithChildren) => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <View style={styles.helloMessage}>
        <ThemedText style={{ color: "white", fontSize: 28 }} type="title">
          Hello Shopper!
        </ThemedText>
        <HelloWave />
      </View>
      <View>{children}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  helloMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: Colors.light.primary,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headerContent: {
    flex: 1,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
});

export default Header;
