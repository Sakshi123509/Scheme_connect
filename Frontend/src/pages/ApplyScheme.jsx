import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationAPI, schemeAPI } from '../services/api';
import Navbar from '../components/Layout/Navbar-light';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function ApplyScheme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadScheme();
  }, [id]);

  const loadScheme = async () => {
    try {
      const res = await schemeAPI.getById(id);
      const schemeData = res.data.scheme || res.data;
      setScheme(schemeData);
      setError(null);
    } catch (err) {
      setError('Failed to load scheme');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setSubmitting(true);
      setError(null);
      
      await applicationAPI.apply(id);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to apply for scheme';
      setError(errorMsg);
      console.error('Apply error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading scheme...</p>
          </div>
        </div>
      </>
    );
  }

  if (!scheme) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-bold mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error || 'Scheme not found'}</p>
            <button
              onClick={() => navigate('/schemes')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back to Schemes
            </button>
          </div>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div className="bg-white border border-green-200 rounded-lg p-8 max-w-md text-center shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Application Submitted!</h2>
            <p className="text-green-600 mb-6">
              Your application for <strong>{scheme.name}</strong> has been submitted successfully.
            </p>
            <p className="text-gray-600 text-sm mb-4">Redirecting to dashboard...</p>
            <button
              onClick={() => navigate('/dashboard')}
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
      <div className="min-h-screen bg-gray-50 pt-20 pb-14">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/schemes/${id}`)}
            className="flex items-center text-amber-700 hover:text-amber-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Scheme Details
          </button>

          {/* Application Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Scheme</h1>
            
            {/* Scheme Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-2">
                {scheme.name}
              </h2>
              <p className="text-amber-700 mb-4">{scheme.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {scheme.category && (
                  <div>
                    <p className="text-amber-600 font-semibold">Category</p>
                    <p className="text-gray-700">{scheme.category}</p>
                  </div>
                )}
                {scheme.deadline && (
                  <div>
                    <p className="text-amber-600 font-semibold">Deadline</p>
                    <p className="text-red-600">{scheme.deadline}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-semibold">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Before You Apply</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Ensure your profile is complete and up-to-date</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Verify you meet the eligibility criteria</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Keep required documents ready</span>
                </li>
              </ul>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              disabled={submitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition ${
                submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => navigate(`/schemes/${id}`)}
              className="w-full mt-3 py-3 px-6 rounded-lg font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
