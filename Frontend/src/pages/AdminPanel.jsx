import React, { useState, useEffect } from "react";
import { schemeAPI, applicationAPI } from "../services/api";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  X, Plus, Edit, Trash2, LogOut, LayoutDashboard,
  FileText, Users, Settings, CheckCircle, XCircle,
  Clock, Eye, BarChart3, TrendingUp, BookOpen, Bell
} from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [schemes, setSchemes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: "", category: "", description: "", ministry: "",
    eligibility: "", benefits: "", documents: "", applicationProcess: "",
    website: "", helpline: "", status: "Active", applicationFormUrl: "", youtubeLink: "",
  });

  useEffect(() => {
    if (activeMenu === "Dashboard" || activeMenu === "Schemes") loadSchemes();
    if (activeMenu === "Dashboard" || activeMenu === "Applications") loadApplications();
    if (activeMenu === "Users") loadUsers();
  }, [activeMenu]);

  const loadSchemes = async () => {
    try {
      setLoading(true);
      const res = await schemeAPI.getAll();
      setSchemes(Array.isArray(res.data) ? res.data : res.data.schemes || []);
    } catch (err) {
      console.error("Error loading schemes:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      const res = await applicationAPI.getAllApplications();
      const data = res.data.applications || res.data || [];
      setApplications(data);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data.users || res.data || []);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this scheme?")) return;
    try {
      await schemeAPI.delete(id);
      loadSchemes();
    } catch (err) {
      alert("Error deleting scheme");
    }
  };

  const handleStatusUpdate = async (appId, status) => {
    try {
      await applicationAPI.updateStatus(appId, status);
      loadApplications();
    } catch (err) {
      alert("Error updating status: " + (err.response?.data?.message || err.message));
    }
  };

  const openModal = (scheme = null) => {
    if (scheme) {
      setEditingScheme(scheme);
      setFormData({
        name: scheme.name || "",
        category: scheme.category || "",
        description: scheme.description || "",
        ministry: scheme.ministry || "",
        eligibility: Array.isArray(scheme.eligibility) ? scheme.eligibility.join(", ") : "",
        benefits: Array.isArray(scheme.benefits) ? scheme.benefits.join(", ") : "",
        documents: Array.isArray(scheme.documents) ? scheme.documents.join(", ") : "",
        applicationProcess: Array.isArray(scheme.applicationProcess) ? scheme.applicationProcess.join(", ") : "",
        website: scheme.website || "",
        helpline: scheme.helpline || "",
        status: scheme.status || "Active",
        applicationFormUrl: scheme.applicationFormUrl || "",
        youtubeLink: scheme.youtubeLink || "",
      });
    } else {
      setEditingScheme(null);
      setFormData({
        name: "", category: "", description: "", ministry: "",
        eligibility: "", benefits: "", documents: "", applicationProcess: "",
        website: "", helpline: "", status: "Active", applicationFormUrl: "", youtubeLink: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        eligibility: formData.eligibility.split(",").map((s) => s.trim()).filter(Boolean),
        benefits: formData.benefits.split(",").map((s) => s.trim()).filter(Boolean),
        documents: formData.documents.split(",").map((s) => s.trim()).filter(Boolean),
        applicationProcess: formData.applicationProcess.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (editingScheme) {
        await schemeAPI.update(editingScheme._id, payload);
      } else {
        await schemeAPI.create(payload);
      }
      setShowModal(false);
      setEditingScheme(null);
      loadSchemes();
    } catch (err) {
      alert("Error saving scheme: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getStatusBadge = (status) => {
    const styles = {
      Approved: "bg-green-100 text-green-700 border border-green-300",
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      Rejected: "bg-red-100 text-red-700 border border-red-300",
      Applied: "bg-blue-100 text-blue-700 border border-blue-300",
      Saved: "bg-gray-100 text-gray-700 border border-gray-300",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const stats = {
    totalSchemes: schemes.length,
    totalApplications: applications.length,
    pending: applications.filter(a => a.status === "Pending" || a.status === "Applied").length,
    approved: applications.filter(a => a.status === "Approved").length,
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Schemes", icon: <BookOpen size={18} /> },
    { name: "Applications", icon: <FileText size={18} /> },
    { name: "Users", icon: <Users size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-10">
        <div className="px-6 py-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">SchemConnect</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setActiveMenu(name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeMenu === name
                  ? "bg-amber-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {icon}
              {name}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-900 hover:text-red-300 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">

        {/* Dashboard */}
        {activeMenu === "Dashboard" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Schemes", value: stats.totalSchemes, icon: <BookOpen size={24} />, color: "bg-blue-500" },
                { label: "Total Applications", value: stats.totalApplications, icon: <FileText size={24} />, color: "bg-purple-500" },
                { label: "Pending Review", value: stats.pending, icon: <Clock size={24} />, color: "bg-yellow-500" },
                { label: "Approved", value: stats.approved, icon: <CheckCircle size={24} />, color: "bg-green-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>{stat.icon}</div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell size={18} className="text-amber-600" />
                Recent Applications
              </h3>
              {applications.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">No applications yet</p>
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {app.user?.name || app.profile?.user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app.scheme?.name || "Scheme"} • {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Schemes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Recent Schemes</h3>
                <button onClick={() => setActiveMenu("Schemes")} className="text-amber-600 text-sm hover:underline">
                  View all →
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {schemes.slice(0, 3).map((scheme) => (
                  <div key={scheme._id} className="border border-gray-200 rounded-lg p-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{scheme.category}</span>
                    <h4 className="font-semibold text-sm text-gray-900 mt-2 mb-3">{scheme.name}</h4>
                    <div className="flex gap-2">
                      <button onClick={() => openModal(scheme)} className="flex-1 text-xs bg-amber-600 text-white py-1.5 rounded hover:bg-amber-700">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(scheme._id)} className="flex-1 text-xs bg-red-500 text-white py-1.5 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schemes */}
        {activeMenu === "Schemes" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Schemes</h2>
                <p className="text-gray-500 text-sm">{schemes.length} total schemes</p>
              </div>
              <button
                onClick={() => openModal()}
                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 font-medium text-sm"
              >
                <Plus size={18} /> Add New Scheme
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Scheme Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Ministry</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schemes.map((scheme) => (
                    <tr key={scheme._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900 text-sm">{scheme.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{scheme.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{scheme.ministry || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          scheme.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {scheme.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openModal(scheme)} className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200">
                            <Edit size={15} />
                          </button>
                          <button onClick={() => handleDelete(scheme._id)} className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications */}
        {activeMenu === "Applications" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
              <p className="text-gray-500 text-sm">{applications.length} total applications</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {applications.length === 0 ? (
                <div className="text-center py-16">
                  <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No applications yet</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Scheme</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Applied On</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <p className="font-medium text-sm text-gray-900">
                            {app.user?.name || app.profile?.user?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">{app.user?.email || app.profile?.user?.email || "—"}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{app.scheme?.name || "—"}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadge(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleStatusUpdate(app._id, "Approved")}
                              className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"
                              title="Approve"
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app._id, "Rejected")}
                              className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                              title="Reject"
                            >
                              <XCircle size={15} />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app._id, "Pending")}
                              className="p-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                              title="Set Pending"
                            >
                              <Clock size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Users */}
        {activeMenu === "Users" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Users</h2>
              <p className="text-gray-500 text-sm">{users.length} registered users</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {users.length === 0 ? (
                <div className="text-center py-16">
                  <Users size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No users found</p>
                  <p className="text-xs text-gray-400 mt-2">Add GET /api/auth/users route in backend</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-sm text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
                          }`}>
                            {user.role || "user"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal - Add/Edit Scheme */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {editingScheme ? "Edit Scheme" : "Add New Scheme"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Scheme Name *" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" required />

                <select value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                  <option value="">Select Category *</option>
                  {["Housing", "Employment", "Health", "Women", "Education"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <textarea placeholder="Description *" value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" rows="3" required />

              <input type="text" placeholder="Ministry" value={formData.ministry}
                onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />

              <textarea placeholder="Eligibility (comma separated, e.g: Age 18-45, Indian citizen)" value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" rows="2" />

              <textarea placeholder="Benefits (comma separated)" value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" rows="2" />

              <textarea placeholder="Documents Required (comma separated)" value={formData.documents}
                onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" rows="2" />

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Website URL" value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />

                <input type="text" placeholder="Application Form URL" value={formData.applicationFormUrl}
                  onChange={(e) => setFormData({ ...formData, applicationFormUrl: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="YouTube Link" value={formData.youtubeLink}
                  onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />

                <input type="text" placeholder="Helpline Number" value={formData.helpline}
                  onChange={(e) => setFormData({ ...formData, helpline: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <select value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 text-sm">
                  {loading ? "Saving..." : editingScheme ? "Update Scheme" : "Add Scheme"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;