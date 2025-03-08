import React from "react";

const Sort = ({ selectedSort, setSelectedSort, setSortFunction }) => {
  const handleSortChange = (sortType) => {
    if (selectedSort === sortType) {
      setSelectedSort("");
      setSortFunction(() => (a, b) => 0); // Reset sorting
    } else {
      setSelectedSort(sortType);
      applySorting(sortType);
    }
  };

  const applySorting = (sortType) => {
    let sortingFunction;
    switch (sortType) {
      case "lowToHigh":
        sortingFunction = (a, b) => a.OriginalPrice - b.OriginalPrice;
        break;
      case "highToLow":
        sortingFunction = (a, b) => b.OriginalPrice - a.OriginalPrice;
        break;
      case "bestSelling":
        sortingFunction = (a, b) =>
          (b.Sold_items / b.Total_items || 0) - (a.Sold_items / a.Total_items || 0);
        break;
      case "highestRated":
        sortingFunction = (a, b) => b.starCount - a.starCount;
        break;
      case "newestFirst":
        sortingFunction = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
        break;
      case "oldestFirst":
        sortingFunction = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
        break;
      default:
        sortingFunction = (a, b) => 0;
    }
    setSortFunction(() => sortingFunction);
  };

  return (
    <form className="text-[20px] text-[#364A15] font-[400]">
      {[
        { id: "lowToHigh", label: "Low to High" },
        { id: "highToLow", label: "High to Low" },
        { id: "bestSelling", label: "Best Selling" },
        { id: "highestRated", label: "Highest Rated" },
        { id: "newestFirst", label: "Newest First" },
        { id: "oldestFirst", label: "Oldest First" },
      ].map(({ id, label }) => (
        <div key={id} className="flex gap-x-1 border-b-2 py-3">
          <input
            type="radio"
            id={id}
            name="sort"
            checked={selectedSort === id}
            onChange={() => handleSortChange(id)}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </form>
  );
};

export default Sort;
