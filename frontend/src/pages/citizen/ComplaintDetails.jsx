
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import complaintService from "../../services/complaintService";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000"
  ).replace(/\/+$/, "");

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const res = await complaintService.getComplaintDetails(id);

      setComplaint(res.data.data.complaint);
      setUpdates(res.data.data.updates || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load complaint details."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-lg">
        Loading complaint...
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-center py-16">
        Complaint not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate("/citizen/my-complaints")}
        className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {complaint.title}
            </h1>

            <p className="text-gray-600 mt-4">
              {complaint.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div>
                <p className="text-sm text-gray-500">
                  Complaint ID
                </p>
                <p className="font-medium">
                  #{complaint.complaint_id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Department
                </p>
                <p className="font-medium">
                  {complaint.department_name || "Not Assigned"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>
                <p className="font-medium">
                  {complaint.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Created
                </p>
                <p className="font-medium">
                  {new Date(
                    complaint.created_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span
              className={`px-4 py-2 rounded-full text-center font-medium ${getStatusColor(
                complaint.status
              )}`}
            >
              {complaint.status}
            </span>

            <span
              className={`px-4 py-2 rounded-full text-center font-medium ${getPriorityColor(
                complaint.priority
              )}`}
            >
              {complaint.priority} Priority
            </span>
          </div>
        </div>

        {complaint.image_path && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Uploaded Image
            </h2>

            <img
              src={`${API_URL}/uploads/${complaint.image_path}`}
              alt="Complaint"
              className="rounded-lg border max-h-96"
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Complaint Timeline
        </h2>

        {updates.length === 0 ? (
          <p className="text-gray-500">
            No status updates available.
          </p>
        ) : (
          <div className="space-y-6">
            {updates.map((update, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-6"
              >
                <p className="font-semibold">
                  {update.old_status} → {update.new_status}
                </p>

                <p className="text-gray-600 mt-2">
                  {update.remarks || "No remarks provided."}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {new Date(
                    update.updated_at
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintDetails;
