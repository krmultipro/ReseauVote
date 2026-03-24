"use client";

import Vote from "@/types/Vote";
import { useEffect, useState } from "react";

const labels = ["Instagram", "TikTok", "X / Twitter", "Snapchat"];
const question = "Quel est ton reseau social prefere ?";

export default function VoteChoice() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchVotes() {
      const request = await fetch("/api/votes");
      if (!request.ok) return;

      const data = await request.json();
      setVotes(data);
    }

    fetchVotes();
  }, []);

  async function handleVote(index: number) {
    if (hasVoted) return;

    const label = labels[index];

    const request = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: label,
      }),
    });

    if (!request.ok) {
      console.log("Erreur vote", request.status);
      return;
    }

    const newVote = await request.json();

    setVotes((prev) => [...prev, newVote]);
    setSelectedChoice(index);
    setHasVoted(true);
    window.dispatchEvent(new Event("vote:created"));
  }

  const choices = labels.map((label) => ({
    label,
    votes: votes.filter((vote) => vote.content === label).length,
  }));

  return (
    <section className="vote-panel">
      <div className="vote-panel-header">
        <div>
          <p className="vote-panel-kicker">Vote En Direct</p>
          <h2 className="vote-panel-title">{question}</h2>
        </div>
        <div className="vote-badge">{votes.length} participation(s)</div>
      </div>

      <div className="vote-choice-list">
        {choices.map((choice, index) => (
          <button
            key={choice.label}
            onClick={() => handleVote(index)}
            disabled={hasVoted}
            className={`vote-button${
              selectedChoice === index ? " selected" : ""
            }${hasVoted ? " disabled" : ""}`}
          >
            <div className="vote-button-row">
              <div>
                <p className="vote-button-label">{choice.label}</p>
                <p className="vote-button-meta">Choix social</p>
              </div>
              <div className="vote-badge">{choice.votes} vote(s)</div>
            </div>
          </button>
        ))}
      </div>

      {hasVoted ? (
        <p className="vote-feedback">Ton vote a ete enregistre.</p>
      ) : null}
    </section>
  );
}
