import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
      
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {blog.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center gap-1">
            <User size={14} /> {blog.author}
          </div>
          <p>{blog.date}</p>
          <div className="flex items-center gap-1">
            <Calendar size={14} /> {blog.date}
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/blogs/${blog.id}`}
          className="inline-block mt-4 text-green-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
