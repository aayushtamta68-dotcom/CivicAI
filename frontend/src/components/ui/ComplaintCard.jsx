import { Link } from "react-router-dom";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function ComplaintCard({
  complaint,
  employeeView = false,
}) {
  const formattedDate = new Date(
    complaint.created_at
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-[#FEFEFE] border border-[#CCCCCC] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">

      <div className="p-6">

        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                {complaint.title}
              </h2>

              <PriorityBadge priority={complaint.priority} />

              <StatusBadge status={complaint.status} />

            </div>

            <p className="mt-4 text-[#666666] leading-7">
              {complaint.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">

              {employeeView && (
                <div>

                  <p className="text-sm text-[#666666]">
                    Citizen
                  </p>

                  <p className="font-medium text-[#2F2F2F] mt-1">
                    {complaint.citizen_name}
                  </p>

                </div>
              )}

              <div>

                <p className="text-sm text-[#666666]">
                  Location
                </p>

                <p className="font-medium text-[#2F2F2F] mt-1">
                  {complaint.location}
                </p>

              </div>

              <div>

                <p className="text-sm text-[#666666]">
                  Reported On
                </p>

                <p className="font-medium text-[#2F2F2F] mt-1">
                  {formattedDate}
                </p>

              </div>

            </div>

          </div>

          <div className="lg:w-48 flex items-end">

            <Link
              to={
                employeeView
                  ? `/employee/complaints/${complaint.complaint_id}`
                  : `/citizen/complaints/${complaint.complaint_id}`
              }
              className="w-full text-center bg-[#B7C396] hover:bg-[#A9B88A] text-[#2F2F2F] font-medium rounded-xl py-3 transition-all duration-200"
            >
              View Details
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintCard;