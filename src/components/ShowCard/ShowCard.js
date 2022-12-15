import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components_css/components.css";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { Icon } from "semantic-ui-react";

const ShowCard = ({ show }) => {
  const [isLoading, setIsLoading] = useState(true);
 
  console.log(show)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <Link
          to={`/show/${show.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${show?.poster_path}`}
            />
            <div className="cards__overlay">
              <div className="card__title">{show.orginal_name}</div>
              <div className="card__runtime">
                {show.first_air_date}
                <div className="card__rating">
                  <span>{show.vote_average}</span>
                  <span>
                    {" "}
                    <Icon name="star" />
                  </span>
                </div>
              </div>
              <div className="card__description">
                {show.overview.slice(0, 118) + "..."}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ShowCard;
