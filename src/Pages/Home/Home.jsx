import { useState } from "react";
import {  useLocation, useParams } from "react-router-dom";
import Feed from "../../Components/Feed/Feed";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SearchResults from "../../Components/Feed/SearchResults";
import "./Home.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import Recommended from "../../Components/Recommended/Recommended";

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/query");
  const isPlayPage = location.pathname.startsWith("/watch");
  const {categoryId} = useParams();

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        {isSearchPage ? (
          <SearchResults />
        ) : isPlayPage ? (
          <div className="play-container">
            <PlayVideo/>
            <Recommended categoryId={categoryId}/>
          </div>
        ) : (
          <Feed category={category} />
        )}
      </div>
    </>
  );
};

export default Home;
