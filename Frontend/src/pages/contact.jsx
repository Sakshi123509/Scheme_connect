import { useState } from "react";
import Navbar from "../components/Layout/Navbar-light";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
const SERVICE_ID = "service_vl0wofv";
const TEMPLATE_ID = "template_ks01ks1";
const PUBLIC_KEY = "RSDPtaKrex0SPmdtE";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          phone: "",
        },
        PUBLIC_KEY,
      );

      // TODO: Replace with actual API call
      // await contactAPI.submit(formData);

      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen px-6 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Contact <span className="text-amber-600">Us</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-amber-600"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-amber-600"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-amber-600"
                    }`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-amber-600"
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                >
                  {status === "sending" ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
            {/* Contact Info */}
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:support@schemeconnect.in"
                        className="text-amber-600 hover:underline"
                      >
                        support@schemeconnect.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+919876543210"
                        className="text-green-600 hover:underline"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Address
                      </h3>
                      <p className="text-gray-700">
                        123, SchemeConnect St,
                        <br />
                        New Delhi, India - 110001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-green-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.india.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      🇮🇳 National Portal of India
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.myscheme.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      MyScheme Portal →
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pmaymis.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      PM Awas Yojana →
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pmkisan.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      PM-KISAN Portal →
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
