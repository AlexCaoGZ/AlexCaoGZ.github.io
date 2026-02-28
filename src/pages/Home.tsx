import { useState, useEffect} from 'react';
import PostCard from '../components/PostCard';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';

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

export default function Home() {

  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || '';
  const [posts, setPosts] = useState<Post[]>([]); 

  useEffect(()=>{
  const fetchPostsFromBackend = async () => {
    const rawJson = await api.get(`/forums/${currentQuery}`,{
      params:{limit:10}
    })
    const rawData = rawJson.data as RawPost[];
    const Posts:Post[] = rawData.map(item =>{
      return{
        postId: item.id,
        title: item.title,
        content: item.content,
        authorId: item.author,
        likes: item.totalLikes,
        reads: item.totalRead
      };
    });

    setPosts(Posts);
  };
  fetchPostsFromBackend();
}, [currentQuery]);


  return (
    <div style={{ padding: '2rem', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {`Forum: "${currentQuery}"`}
      </h2>
          {posts.map((Post) => (
            <PostCard key={Post.postId} {...Post} />
          ))}
    </div>
  );
}