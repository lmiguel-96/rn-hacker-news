import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { ReactNode } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import Locale from "dayjs/locale/es";

import { NewsPost } from "@types";
import PostCardRightActions from "./PostCardRightAction";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/navigation/FeedNavigation";

export interface PostCardProps {
  post: NewsPost;
  index: number;
  deleteItem?: () => void;
}

dayjs.extend(RelativeTime)
dayjs.locale(Locale)

export const PostCard = (props: PostCardProps): ReactNode => {
  const { post, index, deleteItem } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePostClick = (url: string) => {
    navigation.navigate("Post", { url });
  };

  return (
    <Swipeable
      shouldCancelWhenOutside={true}
      key={post.objectID}
      containerStyle={{ overflow: "visible" }}
      rightThreshold={-100}
      renderRightActions={(progress, dragX) => (
        <PostCardRightActions deleteItem={deleteItem} />
      )}
    >
      <TouchableWithoutFeedback onPress={() => handlePostClick(post.story_url)}>
        <View style={styles.card}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.sub}>{`${post.author} - ${dayjs(
            post.created_at
          ).fromNow()}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
    borderRadius: 8,
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sub: {
    fontSize: 12,
  },
});
