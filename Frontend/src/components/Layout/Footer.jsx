import { Link } from "react-router-dom";
import logo from "../../assets/images/icon.jpg";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex content-around gap-3 mb-3">
              <img
                src={logo}
                alt="SchemeConnect Logo"
                className="w-10 h-10 object-cover rounded-full"
              />
              <h3 className="font-semibold text-lg">
                Scheme
                <span className="font-semibold text-amber-500">Connect</span>
              </h3>
            </div>
            <p className="text-sm mb-4">
              Your one-stop platform for discovering and applying to government
              schemes across India.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} />
              <span>support@schemeconnect.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/schemes" className="hover:text-white">
                  Browse Schemes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Government Portals
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.myscheme.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  MyScheme Portal <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://pmaymis.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  PM Awas Yojana <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  PM-KISAN <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://pmjay.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Ayushman Bharat <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.india.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Government of India <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} />
              <span>123, SchemeConnect St, New Delhi, India</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@schemeconnect.in</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} SchemeConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
