import { FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { PostCard } from "./PostCard";
import { NewsPost } from "@types";

export const NewsList = (props: {
  news: NewsPost[];
  isLoading?: boolean;
  nextUrl?: string | null;
  loadMoreItems?: () => void;
  deleteItem?: (postId: string) => void;
}): ReactNode => {
  const {
    news,
    isLoading,
    nextUrl,
    loadMoreItems,
    deleteItem = () => null,
  } = props;

  return (
    <FlatList
      initialNumToRender={20}
      data={news}
      numColumns={1}
      keyExtractor={(post) => String(post.objectID)}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={!isLoading && nextUrl ? loadMoreItems : null}
      onEndReachedThreshold={0.1}
      refreshing={isLoading}
      onRefresh={loadMoreItems}
      renderItem={({ item, index }) => (
        <PostCard
          post={item}
          index={index}
          deleteItem={() => deleteItem(item.objectID)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16
  }
});
