import "./home.css";

import GameCardWrapper from "../components/containers/GameCardWrapper";
import Sidebar from "../components/ui/sidebar/Sidebar";
import Binoculars from "../assets/icons/binoculars.svg?react";
import Error from "../assets/icons/error.svg?react";
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
  fetchNextPageResults,
  selectPageNumber,
} from "../store/slices/searchSlice";
import { AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Home() {
  const searchQuery = useSelector(selectSearchQuery);
  const activeFilters = useSelector(selectFilters);

  const pageSize = useSelector(selectPageSize);
  const pageNumber = useSelector(selectPageNumber);

  const searchLoading = useSelector(selectSearchLoading);
  const searchresults = useSelector(selectSearchResults);
  const searchError = useSelector(selectSearchError);

  const isNoSearchResults = !searchresults ? true : searchresults.count < 1 && !searchLoading;
  const isSearchError = !searchresults ? searchError === 'Failed to fetch' : searchError === 'Failed to fetch' || searchresults.status === "error";
  const dispatch = useDispatch<AppDispatch>();

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const [containerRef, isVisable] = useElementOnScreen(options);

  //TODO: Test this with lots of edge cases etc
  //useEffect for the filters and search query calls
  useEffect(() => {
    dispatch(setPageNumber("1"));
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchSearchResults());
  }, [activeFilters, searchQuery]);

  //useEffect for the infinate scroll 'next page' api call
  //TODO: Improve logic so that on super high res screens the scroll is triggered even when already in view
  
  useEffect(() => {
    if (
      //TODO: See this level of safety type/null checking, I need this everywhere where the API structure could suddenly change. Look up alternatives though, as it feels janky
      !isVisable ||
      searchLoading ||
      isSearchError ||
      !searchresults || //guard to protect against errors from below conditions ||
      searchresults.count === searchresults.games?.length
    ) {
      return;
    }
    dispatch(setPageNumber(String(pageNumber + 1)));
    dispatch(fetchNextPageResults());
  }, [isVisable]);

  const renderGameCardWrappers = () => {
    if (searchLoading) {
      return Array.from({
        length:
          searchresults.games?.length < pageSize
            ? pageSize
            : searchresults.games?.length,
      }).map((_, index) => {
        // @ts-expect-error – Ignore as this is always a loading screen
        return <GameCardWrapper key={index} loading={true} />;
      });
    } else if (searchresults.count < 1) {
      return <></>;
    }
    return (
      <>
        {searchresults.games.map((game, i) => (
          <GameCardWrapper key={i} game={game} loading={false} />
        ))}
      </>
    );
  };

  return (
    <div className="home-container">
      <div className="home-heading">
        {searchQuery.trim() || isSearchError ? (
          isNoSearchResults ? (
            <></>
          ) : (
            <h1>{searchQuery}</h1>
          )
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
          <Sidebar />
        </aside>
        <main className="home-main">
          {isNoSearchResults || isSearchError ? (
            isSearchError ? (
              // TODO: Test This
              <div className="error-results-home">
                <div className="error-results-home-message">
                  <h2>Uh oh, we&apos;re having a connection issue</h2>
                  <p>Please try reloading the page</p>
                </div>
                <div className="error-results-home-img">
                  <Error />
                </div>
              </div>
            ) : (
              <div className="no-results-home">
                <div className="no-results-home-message">
                  <h2>Oh no, we can&apos;t find anything for</h2>
                  <p>{searchQuery}</p>
                </div>
                <div className="no-results-home-img">
                  <Binoculars />
                </div>
              </div>
            )
          ) : (
            <div className="game-card-wrapper">{renderGameCardWrappers()}</div>
          )}
        </main>
        {/*TODO: Consider adding a small delay to the rendering of the next page on infinate scroll event*/}
        
      </div>
      <div ref={containerRef} className="home-paging">
          {/*TODO: Test this, inc with edge cases such as paging to the end and then new search etc
             TODO: Refactor with simple div, Pagination is overkill*/}
          <Pagination
            count={!searchresults ? 0 : Math.ceil(searchresults.count / pageSize)}
            page={pageNumber}
            siblingCount={0}
            hideNextButton={true}
            hidePrevButton={true}
            renderItem={(item) => (
              <PaginationItem {...item} disabled />
            )}
            sx={{
              paddingTop: "24px",
              // Override Classes to target specific styles
              ".MuiPaginationItem-root": {
                color: "#ffffff !important",
                backgroundColor: "#1e1e1e !important",
              },
              ".Mui-disabled.Mui-selected": {
                border: "1px solid #ffffff1f !important",
                backgroundColor: "rgba(255, 255, 255, 0.03) !important",
              },
              "Mui-selected": {
                border: "1px solid #ffffff1f !important",
                backgroundColor: "rgba(255, 255, 255, 0.03) !important",
              },
            }}
            shape="rounded"
          />
        </div>
    </div>
  );
}
export default Home;
