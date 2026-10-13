import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import dashboardService from "../../services/dashboardService";

import DashboardCard from "../../components/ui/DashboardCard";
import ComplaintCard from "../../components/ui/ComplaintCard";

function CitizenDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total_complaints: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    recentComplaints: [],
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDashboard();
  }, []);


  const fetchDashboard = async () => {
    try {

      const response =
        await dashboardService.getCitizenDashboard();

      setDashboard(response.data.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard."
      );

    } finally {

      setLoading(false);

    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">

        <p className="text-[#666666]">
          Loading dashboard...
        </p>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#FEFEFE]">

      <main className="max-w-7xl mx-auto px-6 py-8">

        <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-3xl font-bold text-[#2F2F2F]">
              Dashboard
            </h1>

            <p className="mt-2 text-[#666666]">
              Manage and track your complaints from one place.
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/citizen/submit")
            }
            className="
              px-5
              py-3
              rounded-xl
              bg-[#B7C396]
              text-[#2F2F2F]
              font-medium
              hover:bg-[#E0E7D7]
              transition-all
              duration-200
            "
          >
            Submit Complaint
          </button>


        </section>



        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


          <DashboardCard
            title="Total Complaints"
            value={dashboard.total_complaints}
            accent="#B7C396"
          />


          <DashboardCard
            title="Pending"
            value={dashboard.pending}
            accent="#BA9A91"
          />


          <DashboardCard
            title="In Progress"
            value={dashboard.in_progress}
            accent="#CCCCCC"
          />


          <DashboardCard
            title="Resolved"
            value={dashboard.resolved}
            accent="#E0E7D7"
          />


        </section>




        <section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">


            <div>

              <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                Recent Complaints
              </h2>

              <p className="mt-1 text-[#666666]">
                Your latest submitted complaints.
              </p>

            </div>



            <button
              onClick={() =>
                navigate("/citizen/my-complaints")
              }
              className="
                text-[#2F2F2F]
                font-medium
                hover:text-[#666666]
                transition
              "
            >
              View Complaint History
            </button>


          </div>




          {
            dashboard.recentComplaints.length === 0 ? (

              <div
                className="
                  bg-[#FEFEFE]
                  border
                  border-[#CCCCCC]
                  rounded-xl
                  p-8
                  text-center
                  text-[#666666]
                "
              >
                No complaints have been submitted yet.
              </div>

            ) : (


              <div className="space-y-5">


                {
                  dashboard.recentComplaints.map(
                    (complaint) => (

                      <ComplaintCard
                        key={complaint.complaint_id}
                        complaint={complaint}
                      />

                    )
                  )
                }


              </div>


            )
          }


        </section>


      </main>


    </div>
  );
}


export default CitizenDashboard;