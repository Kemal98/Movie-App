import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tmdbContext from "../../context/movie-context";
import "./navbar.css";
import iconMovie from "../Navbar/movie-icon.svg";
import { Input, Button, Icon } from "semantic-ui-react";

const NavBar = () => {
  const navigate = useNavigate();
  const { getAll, getSearch } = useContext(tmdbContext);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const [search, setSearch] = useState("");
  const [click, setClick] = useState("");

  useEffect(() => {
    const valueSession = sessionStorage.getItem("key");
    if (valueSession) {
      setSearch(valueSession);
    } else {
      setSearch("");
      handlerMovie();
    }
  }, []);

  const handlerMovie = () => {
    setSearch("");
    getAll("movie");
    setClick("movie");
  };

  const handlerShow = () => {
    setSearch("");
    getAll("tv");
    setClick("tv");
  };

  useEffect(() => {
    if (search.split(" ").join("").length > 2) {
      setLoadingSearch(true);
      setTimeout(() => {
        getSearch(search);
        sessionStorage.setItem("key", search);
        setLoadingSearch(false);
      }, 1000);
    } else if (search.length < 2 && search.length < 1) {
      if (click == "movie") return handlerMovie();
      else if (click == "show") {
        handlerShow();
      }
      sessionStorage.removeItem("key");
    }
  }, [search]);

  const handlerBack = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="navBar">
      {window.location.pathname == "/" ? (
        <div className="search">
          <img className="movieImg" src={iconMovie} />
          <div className="searchBox">
            {loadingSearch ? (
              <Input
                loading
                size="small"
                type="text"
                // name="query"
                value={search}
                placeholder="Search..."
                onChange={handleChange}
              />
            ) : (
              <Input
                type="text"
                size="small"
                icon={{ name: "search", circular: true, link: false }}
                value={search}
                placeholder="Search..."
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <nav style={{ display: "flex" }}>
        {window.location.pathname == "/" ? (
          <>
            <Button.Group size="small">
              <Button
                basic
                inverted
                animated="vertical"
                onClick={() => handlerMovie()}
              >
                <Button.Content hidden>Movie</Button.Content>
                <Button.Content visible>
                  <Icon name="film" />
                </Button.Content>
              </Button>

              <Button
                basic
                inverted
                animated="vertical"
                onClick={() => handlerShow()}
              >
                <Button.Content hidden>Tv Show</Button.Content>
                <Button.Content visible>
                  <Icon name="tv" />
                </Button.Content>
              </Button>
            </Button.Group>
          </>
        ) : (
          <div className="arrowLeft">
            <Button onClick={() => handlerBack()} basic inverted animated>
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
