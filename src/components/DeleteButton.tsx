import React, { ReactNode, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";

export const DeleteButton = (props: { deleteItem?: () => void }): ReactNode => {
  const { deleteItem } = props;

  return (
    <View style={styles.container}>
      <Icon
        name={"trash"}
        color={"skyblue"}
        size={30}
        suppressHighlighting={true}
        onPress={() => {
          if (deleteItem) {
            deleteItem();
            Toast.show("Post eliminado exitosamente", {
              duration: Toast.durations.SHORT,

            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    display: "flex",
  },
});
