import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { schemeAPI, applicationAPI } from "../services/api";
import Navbar from "../components/Layout/Navbar";
import pmayimg from "../assets/images/PMAY.png";
import mudra from "../assets/images/mudra.jpg";
import beti from "../assets/images/beti.jpg";
import skill from "../assets/images/skill.webp";
import sukanya from "../assets/images/sukanya.jpg";
import kisan from "../assets/images/kisan.jpg";

import {
  Bookmark, Share2, CheckCircle, Clock, Users, FileText,
  ArrowLeft, Gift, CheckCircle2, ExternalLink, PlayCircle,
  Phone, Globe, Calendar, DollarSign,
} from "lucide-react";

const imageMap = {
  "Pradhan Mantri Awas Yojana": pmayimg,
  "Mudra Yojana": mudra,
  "Beti Bachao Beti Padhao": beti,
  "Skill India": skill,
  "Kisan Samman Nidhi": kisan,
  "Sukanya Samriddhi": sukanya,
  Education: skill,
  Women: beti,
};

const SchemeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);

  useEffect(() => { loadScheme(); }, [id]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadScheme = async () => {
    try {
      setLoading(true);
      const res = await schemeAPI.getById(id);
      setScheme(res.data.scheme || res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load scheme details");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply Now → redirect to official portal
  const handleApply = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first", "error");
      navigate("/login");
      return;
    }
    // Redirect to official application form URL
    if (scheme.applicationFormUrl) {
      window.open(
        scheme.applicationFormUrl.startsWith("http")
          ? scheme.applicationFormUrl
          : `https://${scheme.applicationFormUrl}`,
        "_blank"
      );
    } else if (scheme.website) {
      window.open(
        scheme.website.startsWith("http")
          ? scheme.website
          : `https://${scheme.website}`,
        "_blank"
      );
    } else {
      showToast("Official portal link not available", "error");
    }
  };

  // ✅ Save → backend mein save karo
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to save schemes", "error");
      navigate("/login");
      return;
    }
    try {
      setSaveLoading(true);
      if (!isSaved) {
        await applicationAPI.apply(scheme._id); // status "Saved" se backend mein save hoga
        setIsSaved(true);
        showToast("Scheme saved! View in Dashboard → Saved tab");
      } else {
        showToast("Already saved in your dashboard");
      }
    } catch (err) {
      showToast("Could not save scheme", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  const getSchemeImage = () => {
    if (!scheme) return pmayimg;
    if (imageMap[scheme.name]) return imageMap[scheme.name];
    if (imageMap[scheme.category]) return imageMap[scheme.category];
    return pmayimg;
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleShare = async () => {
    if (!scheme) return;
    if (navigator.share) {
      await navigator.share({ title: scheme.name, text: scheme.description, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading scheme details...</p>
        </div>
      </div>
    </>
  );

  if (error || !scheme) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error || "Scheme not found"}</p>
          <button onClick={() => navigate("/schemes")} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Back to Schemes
          </button>
        </div>
      </div>
    </>
  );

  const youtubeVideoId = getYouTubeVideoId(scheme.youtubeLink);

  return (
    <>
      <Navbar />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
          toast.type === "error" ? "bg-red-500" : "bg-green-600"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 pt-20">

        {/* Hero */}
        <div className="relative h-[350px] flex items-center justify-center text-white overflow-hidden">
          <img src={getSchemeImage()} alt={scheme.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

          <div className="relative z-10 text-center max-w-5xl px-6">
            <span className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm mb-3 font-medium shadow-lg">
              {scheme.status}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">{scheme.name}</h1>
            {scheme.ministry && (
              <p className="text-gray-100 text-base md:text-lg mb-4 font-medium">{scheme.ministry}</p>
            )}
            <div className="flex justify-center flex-wrap gap-4 text-sm">
              {scheme.beneficiaries && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                  <Users className="w-4 h-4" /><span>{scheme.beneficiaries}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <Clock className="w-4 h-4" /><span>{scheme.deadline || "Ongoing"}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={handleSave}
                disabled={saveLoading}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white transition shadow-lg"
                title={isSaved ? "Saved!" : "Save Scheme"}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? "text-amber-600 fill-amber-600" : "text-gray-700"}`} />
              </button>
              <button onClick={handleShare} className="p-2.5 bg-white/90 text-blue-600 rounded-full hover:bg-white transition shadow-lg">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <button onClick={() => navigate("/schemes")} className="flex items-center text-amber-600 hover:text-amber-700 mb-4 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Schemes
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left - Tabs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <nav className="flex border-b overflow-x-auto">
                  {["overview", "eligibility", "benefits", "documents", "process", "video"].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-4 md:px-6 py-3 capitalize whitespace-nowrap text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-amber-600 text-amber-600 bg-amber-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}>
                      {tab}
                    </button>
                  ))}
                </nav>

                <div className="p-6 md:p-8">

                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FileText className="text-green-600" size={28} /> About the Scheme
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
                      </div>
                      {scheme.benefits?.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                          <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                            <Gift className="text-green-600" size={20} /> Key Highlights
                          </h3>
                          <ul className="space-y-2">
                            {scheme.benefits.slice(0, 3).map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />{b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {scheme.ministry && (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-600 font-semibold mb-1">Ministry</p>
                            <p className="text-sm text-blue-900 font-medium">{scheme.ministry}</p>
                          </div>
                        )}
                        {scheme.category && (
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="text-xs text-purple-600 font-semibold mb-1">Category</p>
                            <p className="text-sm text-purple-900 font-medium">{scheme.category}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "eligibility" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={28} /> Eligibility Criteria
                      </h2>
                      <div className="space-y-3">
                        {scheme.eligibility?.length > 0 ? scheme.eligibility.map((e, i) => (
                          <div key={i} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <CheckCircle className="text-green-600 mt-0.5 shrink-0" size={20} />
                            <span className="text-gray-800">{e}</span>
                          </div>
                        )) : <p className="text-gray-500 text-center py-8">No eligibility criteria available</p>}
                      </div>
                    </div>
                  )}

                  {activeTab === "benefits" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <Gift className="text-green-600" size={28} /> Scheme Benefits
                      </h2>
                      <div className="grid gap-3">
                        {scheme.benefits?.length > 0 ? scheme.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                              <CheckCircle2 size={18} className="text-white" />
                            </div>
                            <p className="text-gray-800 pt-1">{b}</p>
                          </div>
                        )) : <p className="text-gray-500 text-center py-8">No benefits information available</p>}
                      </div>
                    </div>
                  )}

                  {activeTab === "documents" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <FileText className="text-blue-600" size={28} /> Required Documents
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scheme.documents?.length > 0 ? scheme.documents.map((d, i) => (
                          <div key={i} className="flex gap-3 items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <FileText className="text-blue-600 shrink-0" size={20} />
                            <span className="text-gray-800 font-medium">{d}</span>
                          </div>
                        )) : <p className="text-gray-500 col-span-2 text-center py-8">No document requirements listed</p>}
                      </div>
                    </div>
                  )}

                  {activeTab === "process" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-5">Application Process</h2>
                      <div className="space-y-4">
                        {scheme.applicationProcess?.length > 0 ? scheme.applicationProcess.map((p, i) => (
                          <div key={i} className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                            <span className="text-gray-800 pt-1">{p}</span>
                          </div>
                        )) : <p className="text-gray-500 text-center py-8">Application process details coming soon</p>}
                      </div>
                    </div>
                  )}

                  {activeTab === "video" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <PlayCircle className="text-red-600" size={28} /> Video Guide
                      </h2>
                      {youtubeVideoId ? (
                        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                          <iframe
                            width="100%" height="100%"
                            src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-12 text-center">
                          <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 mb-3">Video guide not available for this scheme</p>
                          {scheme.website && (
                            <a href={scheme.website} target="_blank" rel="noopener noreferrer"
                              className="text-amber-600 hover:underline text-sm flex items-center gap-1 justify-center">
                              Visit official portal <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 space-y-5">

                {/* Apply Now → official portal */}
                <button onClick={handleApply}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  Apply Now <ExternalLink size={20} />
                </button>

                {/* Save Button */}
                <button onClick={handleSave} disabled={saveLoading}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border-2 transition-all text-sm ${
                    isSaved
                      ? "border-amber-600 bg-amber-50 text-amber-700"
                      : "border-gray-300 text-gray-600 hover:border-amber-400 hover:text-amber-600"
                  }`}>
                  <Bookmark size={18} className={isSaved ? "fill-amber-600 text-amber-600" : ""} />
                  {isSaved ? "Saved to Dashboard" : "Save for Later"}
                </button>

                <div className="h-px bg-gray-200"></div>

                {/* Quick Links */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900">Quick Links</h3>
                  {scheme.website && (
                    <a href={scheme.website.startsWith("http") ? scheme.website : `https://${scheme.website}`}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
                      target="_blank" rel="noopener noreferrer">
                      <Globe className="text-blue-600" size={20} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900">Official Website</p>
                        <p className="text-xs text-blue-600">Visit Portal</p>
                      </div>
                      <ExternalLink size={16} className="text-blue-600" />
                    </a>
                  )}
                  {scheme.applicationFormUrl && (
                    <a href={scheme.applicationFormUrl.startsWith("http") ? scheme.applicationFormUrl : `https://${scheme.applicationFormUrl}`}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition group"
                      target="_blank" rel="noopener noreferrer">
                      <FileText className="text-green-600" size={20} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-900">Application Form</p>
                        <p className="text-xs text-green-600">Open Form</p>
                      </div>
                      <ExternalLink size={16} className="text-green-600" />
                    </a>
                  )}
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Details */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900">Details</h3>
                  {scheme.helpline && (
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Phone className="text-purple-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-xs text-purple-600 font-semibold">Helpline</p>
                        <p className="text-sm text-purple-900 font-medium">{scheme.helpline}</p>
                      </div>
                    </div>
                  )}
                  {scheme.deadline && (
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <Calendar className="text-red-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-xs text-red-600 font-semibold">Deadline</p>
                        <p className="text-sm text-red-900 font-medium">
                          {typeof scheme.deadline === "string" ? scheme.deadline : new Date(scheme.deadline).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  )}
                  {scheme.budget && (
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <DollarSign className="text-green-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-xs text-green-600 font-semibold">Budget</p>
                        <p className="text-sm text-green-900 font-medium">{scheme.budget}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchemeDetailPage;