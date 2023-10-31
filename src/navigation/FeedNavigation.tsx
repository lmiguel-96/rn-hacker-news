import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feed, Post } from "@screens";

export type RootStackParamList = {
  Feed: undefined;
  Post: { url: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const FeedNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};
