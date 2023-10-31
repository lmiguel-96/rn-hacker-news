import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DELETED_STORAGE_KEY,
  POSTS_STORAGE_KEY,
  fetchWith,
} from "@utils";
import { NewsApiResponse, NewsPost } from "src/types/news";

export const getNewsByQuery = ({
  query,
  pageNumber = 0,
}: {
  query: string;
  pageNumber: number;
}): Promise<NewsApiResponse> => {
  try {
    const endpoint = "search_by_date";
    const queryParams = new URLSearchParams({
      query,
      page: `${pageNumber}`,
    });
    return fetchWith(endpoint + "?" + queryParams);
  } catch (error) {
    throw error;
  }
};

export const saveDeletedPosts = async (id: string) => {
  const deletedPosts = await getDeletedPosts();
  if (!deletedPosts.includes(id)) {
    deletedPosts.push(id);
  }
  await AsyncStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedPosts));
};

export const getDeletedPosts = async (): Promise<string[]> => {
  const deletedPosts =
    (await AsyncStorage.getItem(DELETED_STORAGE_KEY)) ?? "[]";
  return JSON.parse(deletedPosts);
};

export const savePosts = async (posts: NewsPost[]) => {
  const savedPosts = await getSavedPosts();
  const ids = savedPosts.map((p) => p.objectID)
  const postsToSave = posts.filter((p) => !ids.includes(p.objectID))
  return await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(postsToSave));
};

export const getSavedPosts = async (): Promise<NewsPost[]> => {
  const posts = (await AsyncStorage.getItem(POSTS_STORAGE_KEY)) ?? "[]";
  return JSON.parse(posts);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
