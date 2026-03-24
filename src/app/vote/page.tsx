import LogoutButton from "@/components/LogoutButton";
import VoteChoice from "@/components/VoteChoice";
import VoteDisplay from "@/components/VoteDisplay";

export default function ChatPage() {
  return (
    <main className="vote-page">
      <div className="vote-shell">
        <div className="vote-header">
          <div>
            <p className="vote-kicker">Social Pulse</p>
            <h1 className="vote-title">Tableau des votes reseaux</h1>
            <p className="vote-subtitle">
              A gauche les choix de vote, a droite la liste des personnes ayant
              vote.
            </p>
          </div>
          <LogoutButton />
        </div>

        <section className="vote-grid">
          <VoteChoice />
          <VoteDisplay />
        </section>
      </div>
    </main>
  );
}
