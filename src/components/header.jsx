import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Images from "./images";

function Header() {
  const [searchTag, setSearchTag] = useState("jungle");
  const [suggestions, setSuggestions] = useState([
    "Jungle",
    "lion",
    "technology",
    "Nature",
    "Car",
  ]);
  const imageRef = useRef("");
  const handleClick = () => {
    setSearchTag(imageRef.current.value);
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTag(suggestion);
  };
  return (
    <>
      <header className="bg-[#07051b] flex flex-col items-center sticky top-0 justify-center p-4 mb-5">
        <div className="text-red-700 font-bold text-lg mb-4">
          ORI <span className="text-white">_Image</span>{" "}
        </div>
        <div className="flex flex-row">
          <div className="flex items-center  bg-white w-[500px] rounded-full px-4 py-2">
            <SearchIcon className="text-gray-500 mr-2" />
            <input
              ref={imageRef}
              type="text"
              placeholder="Search your images..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <Button
            onClick={handleClick}
            sx={{ color: "white" }}
          >
            {" "}
            Search
          </Button>
        </div>
        {suggestions.length > 0 && (
          <div className="text-black  flex flex-row mt-5">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-slate-600 min-w-[60px] bg-red-600 flex justify-center items-center cursor-pointer shadow-xl rounded-sm mr-4"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </header>
      <hr className="sticky top-[165px]" />
      <Images searchTag={searchTag} />
    </>
  );
}

export default Header;
