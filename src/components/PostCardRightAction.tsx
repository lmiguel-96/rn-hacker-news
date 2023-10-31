import React from "react";
import { StyleSheet, View } from "react-native";

import { DeleteButton } from "./DeleteButton";

export default function PostCardRightActions(props: {
  deleteItem?: () => void;
}) {
  const { deleteItem } = props;

  return (
    <View style={styles.options}>
      <View style={styles.cardOption}>
        <DeleteButton deleteItem={deleteItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    width: 80,
    height: "100%",
  },
  cardOption: {
    margin: "auto",
    alignContent: "center",
    justifyContent: "center",
    width: 80,
    height: 100,
  },
});
