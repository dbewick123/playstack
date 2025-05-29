import "./home.css";
import GameCardWrapper from "../components/containers/GameCardWrapper";
import Sidebar from "../components/ui/sidebar/Sidebar";

//Redux
import {
  selectSearchQuery,
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
} from "../store/slices/searchSlice";
import { useSelector } from "react-redux";

function Home() {
  const searchQuery = useSelector(selectSearchQuery);
  const searchLoading = useSelector(selectSearchLoading);
  const searchresults = useSelector(selectSearchResults);
  const searchError = useSelector(selectSearchError);

  const renderGameCardWrappers = () => {
    console.log('serach loading: ',searchLoading)
    console.log('serach error: ',searchError)
    //TODO: Implement a better error screen 
    if(searchLoading || searchError) {
      console.log('getting in here')
      return Array.from({length: 9}).map((_, index) => {
        console.log('this is happening')
        return <GameCardWrapper key={index} loading={true}/>
      })
    } else if (searchresults.count < 1) {
      //TODO: Implement this properly
      return <>No Results Soz</>
    }
      return (
        <>
          <GameCardWrapper game={searchresults.games[0]} loading={false}/>
        </>
      )
  }

  return (
    <div className="home-container">
      <div className="home-heading">
        {/*TODO: Improve this area, it looks a bit jumpy*/}
        {searchQuery.trim() ? (
          <h1>{searchQuery}</h1>
        ) : (
          <h1>
            Check out the games creating a buzz{" "}
            <span className="heading-emoji">🐝</span>
          </h1>
        )}
      </div>
      <div className="home-grid">
        {/* TODO: Improve for mobile view, update filters UX so they don't just hide  */}
        <aside className="home-filters">
          {/* TODO: Color Scheme Var */}
          <Sidebar />
        </aside>
        <main className="home-main">
          <div className="game-card-wrapper">
          {renderGameCardWrappers()}
          </div>
          <div className="game-card-wrapper-paging">
            paging will go here
          </div>
        </main>
      </div>
    </div>
  );
}
export default Home;
