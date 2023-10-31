import React from "react";
import { WebView } from "react-native-webview";

export const Post = (props: any) => {
  const {
    route: { params },
  } = props;

  return <WebView source={{ uri: params.url }} />;
};
