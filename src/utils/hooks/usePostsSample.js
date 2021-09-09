import { useQuery } from 'react-query';
import axios from 'axios';

const getPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export function usePosts() {
  return useQuery('posts', getPosts);
}

const getPostById = async (postId) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return data;
};

export default function usePost(postId) {
  return useQuery(['post', postId], () => getPostById(postId));
}
