import React, { useState } from "react";
import Navbar from "../components/Layout/Navbar-light";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Image from "../assets/images/faq.jpg";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is SchemeConnect?",
      answer:
        "SchemeConnect is a unified platform that helps Indian citizens discover and apply for various government schemes based on their eligibility. It provides a centralized database of schemes from different ministries and departments.",
    },
    {
      question: "How SchemeConnect will help common citizens?",
      answer:
        "SchemeConnect simplifies the process of finding relevant government schemes by providing personalized recommendations based on your profile. It saves time by bringing all schemes to one platform.",
    },
    {
      question: "Can I apply for the schemes through SchemeConnect?",
      answer:
        "SchemeConnect provides detailed information and redirects you to official government portals for application. We act as a bridge between citizens and government schemes.",
    },
    {
      question:
        "How does SchemeConnect work? How do I check for my eligibility?",
      answer:
        "After creating your profile with details like age, income, occupation, and location, our intelligent system automatically matches you with eligible schemes.",
    },
    {
      question: "What all information about a particular scheme can I find?",
      answer:
        "Each scheme page includes eligibility criteria, benefits, required documents, application process steps, deadlines, budget allocation, and helpline numbers.",
    },
    {
      question: "Is registration mandatory?",
      answer:
        "Registration is required to save schemes, track applications, and receive personalized recommendations. However, you can browse available schemes without registering.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely! We follow government-grade security protocols. Your personal information is encrypted and stored securely.",
    },
    {
      question: "Can I track my applications?",
      answer:
        "Yes! Once you apply for schemes, you can track their status from your dashboard under Applied Schemes section.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 mt-8">
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE - Image + Heading */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Heading */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                Checkout our
                <br />
                knowledge base for
                <br />
                some of your
                <br />
                <span className="text-amber-600">answers!</span>
              </h1>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={Image}
                alt="FAQ Illustration"
                className="w-full max-w-lg rounded-2xl shadow-2xl"
              />
            </div>

            {/* CTA Card */}
            <div className="mt-12 bg-amber-500 p-8 rounded-lg text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="mb-4">Our support team is here to help you!</p>
              <a
                href="/contact"
                className="inline-block bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-start p-5 text-left hover:bg-gray-50 transition group"
                >
                  <span className="font-semibold text-gray-900 pr-4 group-hover:text-amber-600 transition">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp
                      className="text-green-600 shrink-0 mt-1"
                      size={24}
                    />
                  ) : (
                    <ChevronDown
                      className="text-gray-400 shrink-0 mt-1 group-hover:text-amber-600 transition"
                      size={24}
                    />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}

            {/* View More Button */}
            <div className="pt-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition group"
              >
                <span className="border-2 border-green-600 px-6 py-2.5 rounded-lg group-hover:bg-green-50 transition">
                  View More
                </span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
