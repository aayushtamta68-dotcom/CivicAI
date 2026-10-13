import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import DashboardCard from "../../components/ui/DashboardCard";
import ComplaintCard from "../../components/ui/ComplaintCard";
import Loading from "../../components/ui/Loading";
function EmployeeDashboard() {
  const [stats, setStats] = useState({
    total_complaints: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  useEffect(() => {
    fetchDashboard();
  }, []);
  async function fetchDashboard() {
    try {
      const [
        dashboardRes,
        complaintsRes
      ] = await Promise.all([
        api.get("/dashboard"),
        api.get("/employees/complaints")
      ]);
      setStats(dashboardRes.data.data);
      setComplaints(complaintsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message ||
        "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }
  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        complaint.location
          ?.toLowerCase()
          .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        complaint.status?.toLowerCase() ===
        statusFilter.toLowerCase();
      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority?.toLowerCase() ===
        priorityFilter.toLowerCase();
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    complaints,
    search,
    statusFilter,
    priorityFilter
  ]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-[#BA9A91]
        text-xl
      ">
        {error}
      </div>
    );
  }
  return (
    <div className="
      min-h-screen
      bg-[#EDECEC]">
      <main className="
        max-w-7xl
        mx-auto
        px-6
        py-8">
        <section className="mb-10">
          <h1 className="
            text-3xl
            font-bold
            text-[#2F2F2F]">
            Welcome, {user?.full_name}
          </h1>
          <p className="
            mt-2
            text-[#666666]">
            Manage complaints assigned to your department.
          </p>
        </section>
        <section className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-10">
          <DashboardCard
            title="Total Complaints"
            value={stats.total_complaints}
            accent="#B7C396"/>
          <DashboardCard
            title="Pending"
            value={stats.pending}
            accent="#BA9A91"/>
          <DashboardCard
            title="In Progress"
            value={stats.in_progress}
            accent="#CCCCCC"/>
          <DashboardCard
            title="Resolved"
            value={stats.resolved}
            accent="#E0E7D7"/>
        </section>
        <section className="
          bg-[#FEFEFE]
          border
          border-[#CCCCCC]
          rounded-xl
          p-6
          mb-8">
          <div className="
            grid
            lg:grid-cols-3
            gap-4">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                border
                border-[#CCCCCC]
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-[#B7C396]"/>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                border
                border-[#CCCCCC]
                rounded-xl
                px-4
                py-3">
              <option>All</option>
              <option>Submitted</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="
                border
                border-[#CCCCCC]
                rounded-xl
                px-4
                py-3">
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </section>
        <section>
          <div className="
            flex
            justify-between
            items-center
            mb-6">
            <h2 className="
              text-2xl
              font-bold
              text-[#2F2F2F]">
              Complaints
            </h2>
            <span className="
              text-[#666666]">
              Showing {filteredComplaints.length} of {complaints.length}
            </span>
          </div>
          {
            filteredComplaints.length === 0 ? (
              <div className="
                bg-[#FEFEFE]
                border
                border-[#CCCCCC]
                rounded-xl
                p-12
                text-center">
                <h3 className="
                  text-xl
                  font-semibold
                  text-[#2F2F2F]">
                  No complaints found
                </h3>
                <p className="
                  mt-2
                  text-[#666666]">
                  Try changing the search or filters.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {
                  filteredComplaints.map(
                    (complaint) => (
                      <ComplaintCard
                        key={
                          complaint.complaint_id
                        }
                        complaint={complaint}
                        employeeView={true}/>
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
export default EmployeeDashboard;