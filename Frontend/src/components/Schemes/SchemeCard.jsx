  import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SchemeCard = ({ scheme }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 
                    hover:shadow-2xl transition duration-300">

      {/* Category */}
      <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
        {scheme.category}
      </span>

      {/* Scheme Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {scheme.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-5">
        {scheme.description}
      </p>

      {/* CTA */}
      <Link
        to={`/schemes/${scheme._id}`}
        className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm hover:gap-3 transition-all"
      >
        View Details <ArrowRight size={16} />
      </Link>
    </div>
  );
};

  export default SchemeCard;