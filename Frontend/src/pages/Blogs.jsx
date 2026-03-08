import BlogCard from "../components/Common/Blogscard.jsx";
import blog1 from "../assets/images/blog1.jpg";
import blog2 from "../assets/images/blog2.jpg";
import blog3 from "../assets/images/blog3.png";
import blog4 from "../assets/images/blog4.webp";
import blog5 from "../assets/images/blog5.jpg";
import Navbar from "../components/Layout/Navbar-light.jsx";

const blogs = [
  {
    id: 1,
    title: "Surat Open Government Data Portal Launched",
    description:
      "The Surat Open Government Data Portal has been launched to promote transparency and citizen participation by providing open access to datasets related to health, transport, education, and urban development.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
    category: "Government Portal",
    author: "Admin",
    date: "12 Jan 2025",
  },
  {
    id: 2,
    title: "Launch of Sikkim Open Government Data Portal",
    description:
      "Sikkim becomes one of the leading states to adopt open data initiatives, enabling students, researchers, and developers to access government datasets for innovation and digital growth.",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    category: "Open Data",
    author: "Editorial Team",
    date: "18 Jan 2025",
  },
  {
    id: 3,
    title: "Claims under Jan Suraksha Mission Explained",
    description:
      "This article explains how beneficiaries can claim insurance benefits under the Jan Suraksha Mission, including eligibility criteria, required documents, and a step-by-step claim process for smooth settlement.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    category: "Insurance Scheme",
    author: "Policy Desk",
    date: "25 Jan 2025",
  },
  {
    id: 4,
    title: "How Open Government Data Helps Students & Developers",
    description:
      "Open government data portals provide real-world datasets that help students build academic projects and enable developers to create innovative, data-driven applications.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Education",
    author: "Tech Writer",
    date: "2 Feb 2025",
  },
  {
    id: 5,
    title: "Top Government Schemes Every Citizen Should Know",
    description:
      "From health insurance to pension and financial assistance programs, this blog highlights the most important government schemes designed to support citizens across India.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    category: "Schemes",
    author: "Govt Insights",
    date: "8 Feb 2025",
  },
  {
    id: 6,
    title: "Digital India: Role of Government Portals",
    description:
      "Government portals play a vital role in the Digital India mission by delivering public services online, improving efficiency, and reducing paperwork for citizens and businesses.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Digital India",
    author: "Admin",
    date: "14 Feb 2025",
  },
];

const BlogsPage = () => {
  return (
    <>
      {/* <Navbar /> */}

      <div className="bg-gray-50 min-h-screen px-6 pt-20 pb-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            SchemeConnect <span className="text-amber-600">Blogs</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Latest updates, guides & insights on government schemes
          </p>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
