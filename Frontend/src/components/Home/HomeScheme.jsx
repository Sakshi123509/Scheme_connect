import React, { useState, useEffect } from "react";
import SchemeCard from "../Schemes/SchemeCard";
import { schemeAPI } from "../../services/api"
import { Search, Filter } from "lucide-react";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Housing",
    "Employment",
    "Health",
    "Women",
    "Education",
  ];

  useEffect(() => {
    loadSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [searchQuery, selectedCategory, schemes]);
  
  const loadSchemes = async () => {
    try {
      console.log("🔄 Fetching schemes...");
      const response = await schemeAPI.getAll();
      console.log("✅ Schemes received:", response.data);
      const schemesData = Array.isArray(response.data) ? response.data : response.data.schemes || [];

      setSchemes(schemesData);
      setFilteredSchemes(schemesData);

      setError(null);
    } catch (err) {
      setError("Failed to load schemes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (scheme) => scheme.category === selectedCategory,
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scheme.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredSchemes(filtered);
  };

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading schemes...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-bold mb-2">
              Error Loading Schemes
            </h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadSchemes}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen px-6 pt-20 pb-14">
        {/* Heading */}
        <div className="max-w-7xl flex justify-center flex-col items-center mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Government <span className="text-green-600">Schemes</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Discover {filteredSchemes.length} schemes based on your eligibility
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl mb-4">No schemes found</p>
            <p className="text-gray-500">Try adjusting your search or filter</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Schemes;
