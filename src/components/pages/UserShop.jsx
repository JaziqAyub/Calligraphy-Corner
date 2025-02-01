import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import EditForm from "../atoms/EditForm";
import { Link, useNavigate } from "react-router-dom";
import "./UserShop.css";

const UserShop = () => {
  const { item } = useContext(ContextJ);
  const [editForm, setEditForm] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [sortOption, setSortOption] = useState("None");

  const navigate = useNavigate();

  console.log(item); // For debugging

  // Step 1: Filter the items based on the selected category.
  const filteredItems =
    Array.isArray(item) && item.length > 0
      ? categoryFilter === "All"
        ? item
        : item.filter((element) => element.category === categoryFilter)
      : [];

  // Step 2: Sort the filtered items based on the sortOption.
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "LowToHigh") {
      return a.itemCost - b.itemCost;
    } else if (sortOption === "HighToLow") {
      return b.itemCost - a.itemCost;
    } else {
      return 0; // No sorting if "None" is selected.
    }
  });

  return (
    <>
      {/* Hero Section */}
      <div className="heroShop">
        <p>Shop Your Favorite Calligraphy Items here</p>

        {/* Filter and Sorting Controls */}
        <div className="filter-container">
          {/* Category Filter */}
          <label htmlFor="category-filter">Filter by Category: </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Big Canvas">Big Canvas</option>
            <option value="Small Canvas">Small Canvas</option>
            <option value="Bookmarks & Calendars">Bookmarks & Calendars</option>
          </select>

          {/* Sorting Options */}
          <label htmlFor="sort-option" style={{ marginLeft: "1rem" }}>
            Sort by Cost:{" "}
          </label>
          <select
            id="sort-option"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="None">None</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        </div>
      </div>

      {/* Conditionally render the edit form or the list of items */}
      {editForm ? (
        <EditForm setEditForm={setEditForm} />
      ) : (
        <div className="useritems">
          {sortedItems.length > 0 ? (
            sortedItems.map((element, index) => (
              <div className="useritem" key={element.id || index}>
                <div className="useritem-image-wrapper">
                  {/* Link to item description page */}
                  <Link to={`/item/description/${element._id}`}>
                    <img
                      src={
                        Array.isArray(element.picUrls)
                          ? element.picUrls[0]
                          : element.picUrls
                      }
                      alt={element.itemTitle}
                      className="useritem-image"
                    />
                  </Link>
                </div>
                <div className="useritem-header">
                  <h3 className="useritem-title">{element.itemTitle}</h3>
                  <div className="useritem-actions">
                    {/* Edit and Delete icons can be added here if needed */}
                  </div>
                </div>
                <div className="useritem-details">
                  <p className="useritem-cost">₹ {element.itemCost}</p>
                  {/* Additional details like description, discount, category can be added here */}
                </div>
                <button
                  onClick={() => navigate(`/order/payment/${element._id}`)}
                  className="userbuy-now-btn"
                >
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserShop;
