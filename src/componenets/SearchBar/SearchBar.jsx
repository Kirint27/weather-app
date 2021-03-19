import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = (props) => {

const{updateSearchText, query,search} = props;

  
  return (
    <div className="search-box">
    <input
      type="text"
      className="search-bar"
      placeholder="Search city..."
      onChange={(e) => updateSearchText(e.target.value)}
       value={query}
       onKeyPress={search}
    />
  </div>
  );
};

export default SearchBar;
