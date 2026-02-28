import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import api from "../utils/api";

interface Post {
  postId: string;
  authorId: string;
  title: string;
  content: string;
  likes: number;
  reads: number;
}

interface RawPost {
  id: string;
  author: string;
  title: string;
  content: string;
  totalLikes: number;
  totalRead: number;
}

export default function Favorite() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsFromBackend = async () => {
      const savedList = localStorage.getItem("favorite_list");
      if (!savedList) return;

      const idList: string[] = JSON.parse(savedList);

      try {
        const postPromises = idList.map(async (id) => {
          const response = await api.get(`/posts/${id}`);
          const item = response.data as RawPost;

          return {
            postId: item.id,
            title: item.title,
            content: item.content,
            authorId: item.author,
            likes: item.totalLikes,
            reads: item.totalRead,
          };
        });

        const fetchedPosts = await Promise.all(postPromises);

        setPosts(fetchedPosts);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPostsFromBackend();
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Favorite</h2>
      {posts.map((Post) => (
        <PostCard key={Post.postId} {...Post} />
      ))}
    </div>
  );
}
