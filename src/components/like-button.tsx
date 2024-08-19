import { useEffect, useState } from "react";
import { TargetType } from "@/types/like";

export function LikeButton({
  targetId,
  targetType,
  likeCount,
}: {
  targetId: string;
  targetType: TargetType;
  likeCount: number;
}) {
  const [hasLike, setHasLike] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  async function onClickLike(targetId: string = "") {
    const res = await fetch("/blog/api/likes", {
      method: "POST",
      body: JSON.stringify({
        targetId,
        nickname: "zaibeiwo",
        targetType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setCurrentLikeCount(currentLikeCount + 1);
    }
  }

  useEffect(() => {
    fetch(`/blog/api/likes?targetId=${targetId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ hasLike }) => {
        setHasLike(hasLike);
      });

    fetch(`/blog/api/likes/count?targetId=${targetId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ likeCount }) => {
        setCurrentLikeCount(likeCount);
      });
  }, [targetId]);

  return (
    <div onClick={() => onClickLike(targetId)}>
      <span>{hasLike ? "dislike" : "like"}</span>
      <span> - {currentLikeCount}</span>
    </div>
  );
}
