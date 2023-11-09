import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Categories = ({ categories }) => {
  const location = useLocation();
  const [paramValue, setParamValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedCategories = params.get("selectedCategory");
    setParamValue(selectedCategories);
  }, [location]);

  const selectCategory = (e) => {
    const searchParams = new URLSearchParams(window.location.search);
    const selectedCategories = searchParams.get("selectedCategory");

    if (selectedCategories) {
      const categoriesArray = selectedCategories.split(",");
      const clickedCategory = e.target.innerText;

      // Check if the clicked category is already selected
      if (categoriesArray.includes(clickedCategory)) {
        // Remove the category from the list
        const updatedCategories = categoriesArray.filter(
          (category) => category !== clickedCategory
        );

        // If there are remaining categories, update the URL with the modified list
        if (updatedCategories.length > 0) {
          searchParams.set("selectedCategory", updatedCategories.join(","));
        } else {
          searchParams.delete("selectedCategory");
        }
      } else {
        // If the category is not already selected, add it to the URL along with the previously selected categories
        searchParams.set(
          "selectedCategory",
          `${selectedCategories},${clickedCategory}`
        );
      }
    } else {
      // If no categories are selected, add the clicked category directly
      searchParams.set("selectedCategory", e.target.innerText);
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
    console.log(searchParams.get("selectedCategory"));
  };

  return (
    <>
      {categories.map((category) => {
        return (
          <button onClick={(e) => selectCategory(e)} key={category}>
            {category}
          </button>
        );
      })}
    </>
  );
};

export default Categories;
