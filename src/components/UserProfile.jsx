import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userSavedPinsQuery,
  userQuery,
  userCreatedPinsQuery,
} from "../utils/data";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const UserProfile = ({ users }) => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const activeBtnStyles =
    "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
  const notActiveBtnStyles =
    "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

  const handleLogout = () => {
    googleLogout();
    navigate("/login");
  };

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      console.log(createdPinsQuery);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  return (
    <GoogleOAuthProvider
      clientId={
        process.env.REACT_APP_GOOGLE_API_TOKEN ||
        "639310751198-4nks0knqerg75siqc7tt0m7o2ll12i7l.apps.googleusercontent.com"
      }
    >
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                alt="user-pic"
              />
              {console.log(user)}
              <img
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                src={user?.image}
                alt="user-pic"
              />
              <h1 className="font-bold text-3xl text-center mt-3">
                {user?.userName}
              </h1>

              {console.log(userId)}
              {console.log(user?._id)}

              <div className="absolute top-0 z-1 right-0 p-2">
                {userId === user?._id && (
                  <button onClick={handleLogout}>Logout</button>
                )}
              </div>
            </div>
            <div className="text-center mb-7">
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("created");
                }}
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("saved");
                }}
                className={`${
                  activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Saved
              </button>
              <div className="px-2">
                <MasonryLayout pins={pins} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserProfile;
