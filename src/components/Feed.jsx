import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "../components/MasonryLayout";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client
        .fetch(query)
        .then((data) => {
          setPins(data);
          
          setLoading(false);
        })
        .catch((e) => console.log("Error is throwing here"));
    } else {
      setLoading(true);
      const query = feedQuery();
      client.fetch(query).then((data) => {
        setPins(data);

        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="we are getting the good items for you" />;

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
};

export default Feed;
