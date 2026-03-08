import Navbar from "../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAPI, profileAPI } from "../services/api";
import { CheckCircle } from "lucide-react";

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600";

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    age: "",
    gender: "",
    category: "",
    income: "",
    occupation: "",
    state: "",
    location: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const userRes = await authAPI.getProfile();
        setUser(userRes.data);

        // Try to load existing profile
        try {
          const profileRes = await profileAPI.get();
          const profile = profileRes.data.profile || profileRes.data;
          if (profile) {
            setProfileData({
              age: profile.age || "",
              gender: profile.gender || "",
              category: profile.category || "",
              income: profile.income || "",
              occupation: profile.occupation || "",
              state: profile.state || "",
              location: profile.location || "",
            });
          }
        } catch (err) {
          // Profile doesn't exist yet, that's okay
          console.log("No existing profile");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  // ✅ FIXED: Save and redirect to dashboard
  const handleSave = async () => {
    try {
      // Validate required fields
      if (!profileData.age || !profileData.gender || !profileData.category) {
        alert("Please fill all required fields (Age, Gender, Category)");
        return;
      }

      setSaving(true);
      await profileAPI.create(profileData);
      
      // Show success message
      setSuccess(true);
      
      // ✅ FIXED: Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(err.response?.data?.message || "Error saving profile");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  // ✅ NEW: Success state with auto-redirect
  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-green-50 pt-32">
          <div className="bg-white border border-green-200 rounded-lg p-8 max-w-md text-center shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Profile Saved!</h2>
            <p className="text-green-600 mb-6">
              Your profile has been saved successfully.
            </p>
            <p className="text-gray-600 text-sm mb-4">Redirecting to dashboard...</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-32 pb-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center uppercase">
            Create Your Profile
          </h1>

          {/* Grid for inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                value={user?.name || ""}
                readOnly
                className={inputClass + " bg-gray-100"}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={user?.email || ""}
                readOnly
                className={inputClass + " bg-gray-100"}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter your Age"
                value={profileData.age}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={profileData.gender === "Male"}
                    onChange={handleChange}
                    required
                  />
                  Male
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={profileData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={profileData.gender === "Other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                onChange={handleChange}
                value={profileData.category}
                className={inputClass}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="Minority">Minority</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Annual Income (₹)
              </label>
              <input
                type="number"
                name="income"
                placeholder="Enter your annual income"
                value={profileData.income}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                placeholder="Enter your occupation"
                value={profileData.occupation}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={profileData.state}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                City/Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter your city or town"
                value={profileData.location}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Save Button - ✅ FIXED: Shows loading state */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 w-full bg-amber-700 text-white py-3 rounded-md font-semibold hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving Profile...
              </>
            ) : (
              "Save Profile & Go to Dashboard"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;