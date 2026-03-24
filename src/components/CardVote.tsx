"use client";

import Vote from "@/types/Vote";

export default function CardVote({
  v,
  userId,
}: {
  v: Vote;
  userId: string | undefined;
}) {
  const isOwn = v.userId === userId;

  return (
    <div className={`vote-card${isOwn ? " own" : ""}`}>
      <div className="vote-card-top">
        <p className="vote-card-name">{v.userName || "Utilisateur inconnu"}</p>
        {isOwn ? <span className="vote-tag">Toi</span> : null}
      </div>
      <p className="vote-card-choice">{v.content}</p>
      <p className="vote-card-time">
        {new Date(v.createdAt).toLocaleTimeString("fr-FR")}
      </p>
    </div>
  );
}
