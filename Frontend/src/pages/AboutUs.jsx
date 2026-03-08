
import Navbar from "../components/Layout/Navbar-light";
import AboutImg from "../assets/images/aboutt.png";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center px-6">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-14">

          {/* LEFT TEXT */}
          <div className="md:w-1/3 ml-28">
            <h2 className="text-4xl font-monstrate font-bold text-amber-600 mb-6">
              About
            </h2>

            <p className="text-gray-700 mb-5 leading-relaxed text-justify">
              <span className="text-green-800 text-xl font-semibold">SchemeConnect</span> is a national digital platform designed to provide a
              one-stop solution for searching and discovering various Government
              welfare schemes available for citizens across India.
            </p>

            <p className="text-gray-700 mb-5 leading-relaxed text-justify">
              The platform provides a technology-driven solution to discover
              scheme information based on the eligibility of the user, making it
              easier to identify the most relevant schemes.
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed text-justify">
              SchemeConnect guides citizens on how to apply for different
              Government schemes, reducing the need to visit multiple Government
              websites.
            </p>

            <button className="border border-amber-600 text-amber-600 px-6 py-2 rounded-md hover:bg-amber-500 hover:text-white transition">
              View More →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={AboutImg}
              alt="Government Scheme Awareness"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
