import React from "react";
import BlogCard from "../../pages/BlogCard";
import blogsData from "../../services/BlogData";
import Navbar from "../Layout/Navbar-light";

const BlogSection = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Latest <span className="text-amber-600">Insights</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Stay updated with government schemes, policies, and helpful guides
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition font-semibold">
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
