import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import {
  User, Mail, MapPin, Briefcase, IndianRupee, Calendar,
  Bookmark, FileText, Clock, Edit, TrendingUp, CheckCircle,
  XCircle, AlertCircle, BarChart3, Target, Award, Bell
} from "lucide-react";
import { authAPI, profileAPI, applicationAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    savedSchemes: 0,
    appliedSchemes: 0,
    approvedSchemes: 0,
    underReview: 0
  });

  useEffect(() => { fetchAllData(); }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }

      const userRes = await authAPI.getProfile();
      setUser(userRes.data);

      try {
        const profileRes = await profileAPI.get();
        const profileData = profileRes.data.profile || profileRes.data;
        if (!profileData) {
          setError("Please complete your profile first");
          setTimeout(() => navigate("/profile"), 2000);
          return;
        }
        setProfile(profileData);
      } catch (err) {
        setError("Please complete your profile first");
        setTimeout(() => navigate("/profile"), 2000);
        return;
      }

      try {
        const appsRes = await applicationAPI.getMyApplications();
        const appsData = appsRes.data.applications || [];
        setApplications(appsData);
        setStats({
          savedSchemes: appsData.filter(a => a.status === "Saved").length,
          appliedSchemes: appsData.filter(a => a.status !== "Saved").length,
          approvedSchemes: appsData.filter(a => a.status === "Approved").length,
          underReview: appsData.filter(a => a.status === "Pending" || a.status === "Applied" || a.status === "Under Review").length
        });
      } catch (err) {
        setApplications([]);
      }

      setError(null);
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
      else setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const map = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Applied: "bg-blue-100 text-blue-800",
      "Under Review": "bg-purple-100 text-purple-800",
      Rejected: "bg-red-100 text-red-800",
      Saved: "bg-gray-100 text-gray-700",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved": return <CheckCircle size={15} className="text-green-600" />;
      case "Pending": case "Applied": case "Under Review": return <Clock size={15} className="text-yellow-600" />;
      case "Rejected": return <XCircle size={15} className="text-red-600" />;
      case "Saved": return <Bookmark size={15} className="text-gray-500" />;
      default: return <AlertCircle size={15} className="text-gray-600" />;
    }
  };

  const getProgress = (status) => {
    const map = { Saved: 10, Applied: 30, "Under Review": 60, Pending: 50, Approved: 100, Rejected: 100 };
    return map[status] || 25;
  };

  const getProgressColor = (status) => {
    if (status === "Approved") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
    if (status === "Saved") return "bg-gray-400";
    return "bg-amber-500";
  };

  const appliedApplications = applications.filter(a => a.status !== "Saved");
  const savedApplications = applications.filter(a => a.status === "Saved");

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-amber-900 mb-2">{error}</h2>
          <p className="text-amber-700 mb-4">Redirecting to profile page...</p>
          <button onClick={() => navigate("/profile")} className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700">
            Go to Profile
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Welcome Banner */}
          <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-5"><Award size={200} /></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
              <p className="text-gray-400">Here's your scheme activity overview</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Saved Schemes", value: stats.savedSchemes, icon: <Bookmark size={24} />, color: "border-blue-500", iconColor: "text-blue-500" },
              { label: "Applied", value: stats.appliedSchemes, icon: <FileText size={24} />, color: "border-purple-500", iconColor: "text-purple-500" },
              { label: "Approved", value: stats.approvedSchemes, icon: <CheckCircle size={24} />, color: "border-green-500", iconColor: "text-green-500" },
              { label: "Under Review", value: stats.underReview, icon: <Clock size={24} />, color: "border-amber-500", iconColor: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color}`}>
                <div className={`${stat.iconColor} mb-2`}>{stat.icon}</div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px overflow-x-auto">
                    {[
                      { key: "overview", label: "Profile" },
                      { key: "applied", label: `Applied (${appliedApplications.length})` },
                      { key: "saved", label: `Saved (${savedApplications.length})` },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`py-4 px-6 font-medium text-sm whitespace-nowrap transition ${
                          activeTab === tab.key
                            ? "border-b-2 border-amber-600 text-amber-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">

                  {/* Profile Tab */}
                  {activeTab === "overview" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
                        <button onClick={() => navigate("/profile")}
                          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm">
                          <Edit size={16} /> Edit Profile
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: <User size={20} className="text-blue-600" />, label: "Full Name", value: user?.name, bg: "from-blue-50 to-blue-100" },
                          { icon: <Mail size={20} className="text-green-600" />, label: "Email", value: user?.email, bg: "from-green-50 to-green-100" },
                          { icon: <Calendar size={20} className="text-purple-600" />, label: "Age", value: profile?.age ? `${profile.age} years` : "N/A", bg: "from-purple-50 to-purple-100" },
                          { icon: <User size={20} className="text-pink-600" />, label: "Gender", value: profile?.gender, bg: "from-pink-50 to-pink-100" },
                          { icon: <FileText size={20} className="text-yellow-600" />, label: "Category", value: profile?.category, bg: "from-yellow-50 to-yellow-100" },
                          { icon: <IndianRupee size={20} className="text-red-600" />, label: "Annual Income", value: profile?.income ? `₹${profile.income.toLocaleString()}` : "N/A", bg: "from-red-50 to-red-100" },
                          { icon: <Briefcase size={20} className="text-indigo-600" />, label: "Occupation", value: profile?.occupation, bg: "from-indigo-50 to-indigo-100" },
                          { icon: <MapPin size={20} className="text-teal-600" />, label: "Location", value: profile?.location && profile?.state ? `${profile.location}, ${profile.state}` : "N/A", bg: "from-teal-50 to-teal-100" },
                        ].map((item, i) => (
                          <div key={i} className={`flex items-center gap-3 p-4 bg-linear-to-r ${item.bg} rounded-lg`}>
                            {item.icon}
                            <div>
                              <p className="text-xs text-gray-500">{item.label}</p>
                              <p className="font-semibold text-gray-900 text-sm">{item.value || "N/A"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Applied Tab */}
                  {activeTab === "applied" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-5">Applied Schemes</h2>
                      {appliedApplications.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="mx-auto text-gray-300 mb-4" size={56} />
                          <p className="text-gray-500 mb-4">No applications yet</p>
                          <button onClick={() => navigate("/schemes")}
                            className="bg-amber-600 text-white px-6 py-2.5 rounded-lg hover:bg-amber-700 text-sm">
                            Browse Schemes
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {appliedApplications.map((app) => (
                            <div key={app._id} className="p-5 border border-gray-200 rounded-xl hover:shadow-sm transition">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="font-bold text-gray-900">{app.scheme?.name || "Scheme"}</h3>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    <Calendar size={12} className="inline mr-1" />
                                    Applied {new Date(app.createdAt).toLocaleDateString('en-IN')}
                                  </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(app.status)}`}>
                                  {getStatusIcon(app.status)} {app.status}
                                </span>
                              </div>
                              {/* Progress Bar */}
                              <div className="mb-3">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>{getProgress(app.status)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${getProgressColor(app.status)}`}
                                    style={{ width: `${getProgress(app.status)}%` }} />
                                </div>
                              </div>
                              <button onClick={() => navigate(`/schemes/${app.scheme?._id}`)}
                                className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                                View Details →
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Saved Tab */}
                  {activeTab === "saved" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-5">Saved Schemes</h2>
                      {savedApplications.length === 0 ? (
                        <div className="text-center py-12">
                          <Bookmark className="mx-auto text-gray-300 mb-4" size={56} />
                          <p className="text-gray-500 mb-2">No saved schemes yet</p>
                          <p className="text-gray-400 text-sm mb-4">Save schemes to apply later</p>
                          <button onClick={() => navigate("/schemes")}
                            className="bg-amber-600 text-white px-6 py-2.5 rounded-lg hover:bg-amber-700 text-sm">
                            Browse Schemes
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {savedApplications.map((app) => (
                            <div key={app._id} className="p-5 border border-gray-200 rounded-xl hover:shadow-sm transition">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-gray-900">{app.scheme?.name || "Scheme"}</h3>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    <Bookmark size={12} className="inline mr-1" />
                                    Saved on {new Date(app.createdAt).toLocaleDateString('en-IN')}
                                  </p>
                                  {app.scheme?.category && (
                                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                      {app.scheme.category}
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() => navigate(`/schemes/${app.scheme?._id}`)}
                                  className="bg-amber-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-amber-700"
                                >
                                  Apply Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="text-amber-600" size={18} />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {applications.slice(0, 4).map((app, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className={`p-1.5 rounded-lg ${app.status === "Saved" ? "bg-gray-100" : "bg-blue-100"}`}>
                        {app.status === "Saved"
                          ? <Bookmark size={16} className="text-gray-500" />
                          : <FileText size={16} className="text-blue-600" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">
                          {app.status === "Saved" ? "Saved" : "Applied for"} {app.scheme?.name || "scheme"}
                        </p>
                        <p className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2.5">
                  <button onClick={() => navigate("/schemes")}
                    className="w-full bg-white text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm text-sm">
                    Browse Schemes
                  </button>
                  <button onClick={() => navigate("/profile")}
                    className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 transition text-sm">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;