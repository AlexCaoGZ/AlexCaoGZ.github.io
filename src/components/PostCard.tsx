import { useState } from "react";

interface PostCardProps {
  postId: string;
  authorId: string;
  title: string;
  content: string;
  likes: number;
  reads: number;
}

export default function PostCard({
  authorId,
  title,
  content,
  likes,
  reads,
  postId,
}: PostCardProps) {
  const [text, setText] = useState(() => {
    const FavoriteList = localStorage.getItem("favorite_list");
    if (FavoriteList) {
      const AFavoriteList: string[] = JSON.parse(FavoriteList);
      if (AFavoriteList.includes(postId)) {
        return "★ Favorited";
      }
    }
    return "☆ Favorite";
  });

  const handleFavorite = () => {
    const FavoriteList = localStorage.getItem("favorite_list");
    if (!FavoriteList) {
      const AFavoriteList: string[] = [postId];
      localStorage.setItem("favorite_list", JSON.stringify(AFavoriteList));
      setText("★ Favorited");
    } else {
      const isAlreadyFavorited = FavoriteList.includes(postId);
      const AFavoriteList: string[] = JSON.parse(FavoriteList);

      if (isAlreadyFavorited) {
        const NewAFavoriteList: string[] = AFavoriteList.filter(
          (AFavoriteList) => AFavoriteList != postId,
        );
        localStorage.setItem("favorite_list", JSON.stringify(NewAFavoriteList));
        setText("☆ Favorite");
      } else {
        AFavoriteList.push(postId);
        localStorage.setItem("favorite_list", JSON.stringify(AFavoriteList));
        setText("★ Favorited");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}> </div>
      <div
        style={{
          flex: 4,
          backgroundColor: "white",
          padding: "20px",
          borderBottom: "1px solid #DCDCDC",
          margin: "0 auto 20px auto",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f9f9f9")
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
      >
        <div
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "black",
            marginBottom: "12px",
          }}
        >
          {title}
        </div>

        <div
          style={{ color: "black", lineHeight: "1.6", marginBottom: "20px" }}
        >
          {content}
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            color: "#666",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "12px",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "inherit",
              color: "inherit",
            }}
            onClick={handleFavorite}
          >
            <span>{text}</span>
          </button>
          <span>🖒 {likes} Likes</span>
          <span>👁 {reads} Reads</span>
          <span style={{ marginLeft: "auto" }}>author: {authorId}</span>
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
}
