import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { NewsList } from "@components";
import { useNewsSearch } from "@hooks";

export const Feed = () => {
  const [query, setQuery] = useState<string>("mobile");
  const [pageNumber, setPageNumber] = useState<number>(0);

  const { news, isLoading, deletePost } = useNewsSearch(query, pageNumber);

  const loadNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.content}>
      <NewsList
        news={news}
        isLoading={isLoading}
        loadMoreItems={loadNextPage}
        deleteItem={deletePost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "100%",
  },
});
