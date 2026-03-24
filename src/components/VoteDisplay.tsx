"use client";

import { authClient } from "@/lib/auth-client";
import Vote from "@/types/Vote";
import { useEffect, useState } from "react";
import CardVote from "./CardVote";

export default function VoteDisplay() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    async function fetchVotes() {
      const request = await fetch("/api/votes");
      if (!request.ok) {
        console.log(request.status);
        return;
      }
      const data = await request.json();
      setVotes(data);
    }

    fetchVotes();

    function handleVoteCreated() {
      fetchVotes();
    }

    window.addEventListener("vote:created", handleVoteCreated);

    return () => {
      window.removeEventListener("vote:created", handleVoteCreated);
    };
  }, []);

  if (votes.length === 0) {
    return (
      <aside className="vote-panel vote-list-panel">
        <p className="vote-empty">Aucun vote.</p>
      </aside>
    );
  }

  return (
    <aside className="vote-panel vote-list-panel">
      <div className="vote-list-header">
        <div>
          <h2 className="vote-panel-title">Liste des votants</h2>
        </div>
        <div className="vote-badge">Total : {votes.length}</div>
      </div>

      <div className="vote-list">
        {votes.map((v) => (
          <CardVote v={v} userId={session?.user.id} key={v._id} />
        ))}
      </div>
    </aside>
  );
}
