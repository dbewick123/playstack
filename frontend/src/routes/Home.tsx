import "./home.css";
import GameCardWrapper from "../components/containers/GameCardWrapper";
import Sidebar from "../components/ui/sidebar/Sidebar";

function Home() {
  return (
    <div className="home-container">
      <div className="home-heading">
        <h1>
          Check out the games creating a buzz{" "}
          <span className="heading-emoji">🐝</span>
        </h1>
      </div>
      <div className="home-grid">
        <aside className="home-filters">
          {/* TODO: Color Scheme Var */}
          <Sidebar colorScheme="dark"/>
        </aside>
        <main className="home-main">
          <div className="game-card-wrapper">
            <GameCardWrapper />
            <GameCardWrapper />
            <GameCardWrapper />
            <GameCardWrapper />
          </div>
        </main>
      </div>
    </div>
  );
}
export default Home;
