import {
  getDeletedPosts,
  getNewsByQuery,
  getSavedPosts,
  saveDeletedPosts,
  savePosts,
} from "@api";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import { NewsPost } from "src/types";

type State = {
  isLoading: boolean;
  hasMore: boolean;
  news: NewsPost[];
};

export const useNewsSearch = (
  query: string | null,
  pageNumber: number
): {
  isLoading: boolean;
  hasMore: boolean;
  news: NewsPost[];
  deletePost: (postId: string) => void;
} => {
  const [state, setState] = useState<State>({
    isLoading: false,
    news: [],
    hasMore: false,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, news: [] }));
  }, [query]);

  useEffect(() => {
    (async () => {
      if (!query) {
        return;
      }
      const deletedPosts = await getDeletedPosts();

      setState((prevState) => ({ ...prevState, isLoading: true }));

      try {
        const newNews: NewsPost[] = [];
        const response = await getNewsByQuery({ query, pageNumber });

        for (let item of response?.hits) {
          if (
            item.story_url &&
            item.created_at &&
            item.story_title &&
            item.author &&
            !deletedPosts.includes(item.objectID)
          ) {
            newNews.push({
              story_url: item.story_url,
              created_at: item.created_at,
              title: item.story_title,
              author: item.author,
              objectID: item.objectID,
            });
          }
        }
        Toast.show("Nuevas publicaciones cargadas...", {
          duration: Toast.durations.SHORT,
        });

        savePosts([...newNews, ...state.news]);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          news: [...newNews, ...prevState.news],
          hasMore: pageNumber < response.nbPages,
        }));
      } catch (e) {
        Toast.show(
          "Ocurrió un problema verifica tu conexión a internet e intenta de nuevo, se muestran las publicaciones en caché",
          {
            duration: Toast.durations.LONG,
          }
        );

        let cachedPosts = await getSavedPosts();
        cachedPosts = cachedPosts.filter(
          (p) => !deletedPosts.includes(p.objectID)
        );
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          news: cachedPosts,
          hasMore: false,
        }));
      }
    })();
  }, [pageNumber, query]);

  const deletePost = (postId: string) => {
    const newNews = state.news.filter((item) => item.objectID !== postId);
    setState((prevState) => ({ ...prevState, news: newNews }));
    saveDeletedPosts(postId);
  };

  return {
    hasMore: state.hasMore,
    isLoading: state.isLoading,
    news: state.news,
    deletePost,
  };
};
