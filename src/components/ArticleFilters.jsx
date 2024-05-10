import { useState } from "react";
// topic", "sort_by", "order
function ArticleFilters({
  sortByFilter,
  setSortByFilter,
  orderFilter,
  setOrderFilter,

  setSearchParams,
}) {
  function handleSortByChange(event) {
    const value = event.target.value;
    setSortByFilter(value);
    setSearchParams((prevParams) => {
      let newParams = {};
      for (const entry of prevParams.entries()) {
        const [param, value] = entry;
        newParams[param] = value;
      }
      return { ...newParams, sort_by: value };
    });
  }

  function handleOrderChange(event) {
    const value = event.target.value;
    setOrderFilter(value);
    setSearchParams((prevParams) => {
      let newParams = {};
      for (const entry of prevParams.entries()) {
        const [param, value] = entry;
        newParams[param] = value;
      }
      return { ...newParams, order: value };
    });
  }

  return (
    <>
      <div className="article-filters">
        <label htmlFor="sortBySelect">Sort By:</label>
        <select
          id="sortBySelect"
          value={sortByFilter}
          onChange={handleSortByChange}
        >
          <option value="created_at">Date Created</option>
          <option value="author">Author</option>
          <option value="votes">Vote Count</option>
        </select>

        <label htmlFor="orderSelect">Order:</label>
        <select
          id="orderSelect"
          value={orderFilter}
          onChange={handleOrderChange}
        >
          <option value="DESC">Descending</option>
          <option value="ASC">Ascending</option>
        </select>
      </div>
    </>
  );
}

export default ArticleFilters;
