import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AiSymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Load saved result from localStorage on mount
  useEffect(() => {
    const savedResult = localStorage.getItem("ai_symptom_result");
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/ai/symptom-check`, {
        symptoms,
      });

      setResult(data);
      localStorage.setItem("ai_symptom_result", JSON.stringify(data)); // ✅ Save to localStorage
    } catch (err) {
      alert("Failed to analyze symptoms. Try again.",err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (id) => {
  window.scrollTo({ top: 0, behavior: "instant" });
  setTimeout(() => {
    navigate(`/appointment/${id}`);
  }, 50); // Small delay to avoid blink
};

  return (
    <div className="min-h-[80vh] flex flex-col gap-6 items-center justify-start py-10 px-4 text-[#262626]">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        AI Symptom Checker
      </h1>
      <form
        onSubmit={handleCheck}
        className="w-full max-w-xl flex flex-col gap-4"
      >
        <textarea
          className="border border-gray-300 rounded-lg p-4 h-32 resize-none focus:outline-primary text-sm"
          placeholder="Describe your symptoms (e.g., headache, chest pain, nausea...)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary cursor-pointer text-white px-6 py-2 rounded-full hover:opacity-90 transition-all text-sm"
        >
          {loading ? "Analyzing..." : "AI Analysis"}
        </button>
      </form>

      {/* Result display */}
      {result && (
        <div className="w-full max-w-3xl mt-8 bg-gray-50 rounded-xl p-6 shadow-md flex flex-col gap-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Suggested Speciality:
            </h2>
            <div className="flex gap-2 flex-wrap text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {result.suggestedSpeciality}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Matched Doctors:</h2>
            {result.matchedDoctors.length === 0 ? (
              <p className="text-sm text-gray-600">
                No doctors found for this speciality.
              </p>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {result?.matchedDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleNavigate(doc.id)}
                    className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm"
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-24 h-24 rounded-full object-cover mb-3"
                    />
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500 mb-1">
                      {doc.speciality}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        doc.available ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {doc.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiSymptomChecker;
