
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [complaint, setComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);

  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000"
  ).replace(/\/+$/, "");

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  async function fetchComplaint() {
    try {
      setLoading(true);

      const response = await api.get(
        `/employees/complaints/${id}`
      );

      const complaintData = response.data.data.complaint;

      setComplaint(complaintData);
      setUpdates(response.data.data.updates || []);
      setStatus(complaintData.status);
    } catch (error) {
      console.error(error);
      alert("Failed to load complaint.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put(
        `/employees/complaints/${id}`,
        {
          status,
          remarks,
        }
      );

      alert("Complaint updated successfully.");
      setRemarks("");

      await fetchComplaint();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update complaint."
      );
    } finally {
      setSaving(false);
    }
  }

  const statusColor = {
    Submitted:
      "bg-orange-100 text-orange-700 border border-orange-200",
    Pending:
      "bg-orange-100 text-orange-700 border border-orange-200",
    "In Progress":
      "bg-blue-100 text-blue-700 border border-blue-200",
    Resolved:
      "bg-green-100 text-green-700 border border-green-200",
  };

  const priorityColor = {
    High:
      "bg-red-100 text-red-700 border border-red-200",
    Medium:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Low:
      "bg-green-100 text-green-700 border border-green-200",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading complaint...
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Complaint not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-slate-800 hover:bg-slate-900 text-white px-5 py-3 rounded-lg transition"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Complaint #{complaint.complaint_id}
              </h1>

              <p className="text-gray-500 mt-2">
                Complete complaint information and update status.
              </p>
            </div>

            <div className="flex gap-3">
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  priorityColor[complaint.priority] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {complaint.priority}
              </span>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  statusColor[complaint.status] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {complaint.status}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              {complaint.image_path ? (
                <img
                  src={`${API_URL}/uploads/${complaint.image_path}`}
                  alt="Complaint"
                  className="w-full h-[420px] object-cover rounded-xl border"
                />
              ) : (
                <div className="w-full h-[420px] rounded-xl bg-slate-200 flex items-center justify-center text-gray-500 text-lg">
                  No Image Available
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-500">
                  Title
                </h3>
                <p className="text-2xl font-semibold mt-1">
                  {complaint.title}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">
                  Description
                </h3>
                <p className="leading-7 mt-1 text-slate-700">
                  {complaint.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <h3 className="text-sm text-gray-500">
                    Citizen
                  </h3>
                  <p className="font-semibold">
                    {complaint.citizen_name}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500">
                    Location
                  </h3>
                  <p className="font-semibold">
                    {complaint.location}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500">
                    Created
                  </h3>
                  <p className="font-semibold">
                    {new Date(
                      complaint.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500">
                    Complaint ID
                  </h3>
                  <p className="font-semibold">
                    #{complaint.complaint_id}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold mb-5">
                  Update Complaint
                </h2>

                <form
                  onSubmit={handleUpdate}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status
                    </label>

                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Remarks
                    </label>

                    <textarea
                      rows="5"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Add remarks about the progress..."
                      className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-500 text-white px-6 py-3 rounded-lg transition"
                  >
                    {saving ? "Updating..." : "Update Complaint"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t mt-10 pt-10">
            <h2 className="text-3xl font-bold mb-6">
              Complaint History
            </h2>

            {updates.length === 0 ? (
              <div className="bg-slate-50 border rounded-xl p-8 text-center text-gray-500">
                No updates available.
              </div>
            ) : (
              <div className="space-y-5">
                {updates.map((update, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-5 bg-slate-50 hover:bg-white transition"
                  >
                    <div className="flex flex-wrap justify-between gap-4 mb-4">
                      <div>
                        <span className="font-semibold">
                          Status
                        </span>

                        <div className="mt-2 flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              statusColor[update.old_status] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {update.old_status}
                          </span>

                          <span className="font-bold">→</span>

                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              statusColor[update.new_status] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {update.new_status}
                          </span>
                        </div>
                      </div>

                      <div className="text-gray-500 text-sm">
                        {new Date(
                          update.updated_at
                        ).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Remarks
                      </h4>
                      <p className="text-slate-700 leading-7">
                        {update.remarks || "No remarks added."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
