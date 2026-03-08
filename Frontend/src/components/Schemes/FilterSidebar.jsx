// src/components/Schemes/FilterSidebar.jsx
import React from "react";

const FilterSidebar = ({ filters, setFilters }) => {
  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  return (
    <div className="w-64 p-4 bg-white rounded-xl shadow-lg sticky top-20 h-fit">
      <h3 className="text-lg font-bold mb-4">Filter Schemes</h3>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Category</h4>
        {["Housing", "Women", "Agriculture", "Health", "Finance", "Environment", "Technology", "Employment"].map((cat) => (
          <label key={cat} className="block text-sm mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCheckbox("category", cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Eligibility</h4>
        {["Students", "Women", "Senior Citizens", "Farmers"].map((elig) => (
          <label key={elig} className="block text-sm mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCheckbox("eligibility", elig)}
            />
            {elig}
          </label>
        ))}
      </div>

      <button
        onClick={() => setFilters({ category: [], eligibility: [] })}
        className="mt-2 text-sm font-semibold text-red-500"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterSidebar;
