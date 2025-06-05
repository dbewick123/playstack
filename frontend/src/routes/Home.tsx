import "./home.css";

import GameCardWrapper from "../components/containers/GameCardWrapper";
import Sidebar from "../components/ui/sidebar/Sidebar";
import Binoculars from "../assets/icons/binoculars.svg?react";
import useElementOnScreen from "../hooks/useElementOnScreen";

//External Components
import { Pagination, PaginationItem } from "@mui/material";

//Redux
import {
  selectSearchQuery,
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectFilters,
  selectPageSize,
  setPageNumber,
  fetchSearchResults,
  selectPageNumber,
} from "../store/slices/searchSlice";
import { AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Home() {
  const searchQuery = useSelector(selectSearchQuery);
  const activeFilters = useSelector(selectFilters);

  const pageSize = Number(useSelector(selectPageSize));
  const pageNumber = useSelector(selectPageNumber);

  const searchLoading = useSelector(selectSearchLoading);
  const searchresults = useSelector(selectSearchResults);
  const searchError = useSelector(selectSearchError);

  const dispatch = useDispatch<AppDispatch>();

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const [containerRef, isVisable] = useElementOnScreen(options);

  //TODO: Test this with lots of edge cases etc
  useEffect(() => {
    dispatch(fetchSearchResults());
  }, [activeFilters]);

  const renderGameCardWrappers = () => {
    //TODO: Implement a better error screen
    if (searchLoading || searchError || searchresults.status === "error") {
      return Array.from({ length: pageSize }).map((_, index) => {
        // @ts-expect-error – Ignore as this is always a loading screen
        return <GameCardWrapper key={index} loading={true} />;
      });
    } else if (searchresults.count < 1) {
      return <></>;
    }

    if (searchresults.games.length > pageSize) {
      return (
        <>
          {searchresults.games.slice(0, 9).map((game, i) => (
            <GameCardWrapper key={i} game={game} loading={false} />
          ))}
        </>
      );
    } else {
      return (
        <>
          {searchresults.games.map((game, i) => (
            <GameCardWrapper key={i} game={game} loading={false} />
          ))}
        </>
      );
    }
  };

  const handlePagingChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber.toString()));
    dispatch(fetchSearchResults());
  };

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
          {searchresults.count < 1 && !searchLoading ? (
            <div className="no-results-home">
              <h2>No results found for </h2>
              <div className="no-results-home-img">
                <Binoculars />
              </div>
            </div>
          ) : (
            <div className="game-card-wrapper">{renderGameCardWrappers()}</div>
          )}
        </main>
        <div ref={containerRef} className="home-paging">
          {/*TODO: Test this, inc with edge cases such as paging to the end and then new search etc*/}
          <Pagination
            count={Math.ceil(searchresults.count / pageSize)}
            onChange={(_, page) => handlePagingChange(page)}
            page={Number(pageNumber)}
            renderItem={(item) =>
              item.page === Math.ceil(searchresults.count / pageSize) &&
              item.type === "page" &&
              Number(pageNumber) <
                Math.ceil(searchresults.count / pageSize) - 1 ? (
                // @ts-expect-error – Spread passing from internal Component variable
                <PaginationItem {...item} disabled />
              ) : (
                // @ts-expect-error – Spread passing from internal Component variable
                <PaginationItem {...item} />
              )
            }
            sx={{
              paddingTop: "24px",
              // Override Classes to target specific styles
              ".MuiPaginationItem-root": {
                color: "rgba(255, 255, 255, 0.871)",
                backgroundColor: "#1e1e1e",
              },
              ".MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              },
              ".Mui-selected": {
                border: "1px solid #ffffff1f",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              },
              ".MuiPaginationItem-ellipsis:hover": {
                backgroundColor: "#1e1e1e",
              },
              ".MuiPaginationItem-previousNext": {
                color: "rgba(255, 255, 255, 0.871)",
                border: "1px solid #ffffff1f",
              },
            }}
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
