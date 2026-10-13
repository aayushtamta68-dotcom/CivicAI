import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ role }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const citizenLinks = [
    {
      name: "Dashboard",
      path: "/citizen/dashboard",
    },
    {
      name: "Submit Complaint",
      path: "/citizen/submit",
    },
    {
      name: "My Complaints",
      path: "/citizen/my-complaints",
    },
  ];

  const employeeLinks = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
    },
    {
      name: "Complaints",
      path: "/employee/dashboard",
    },
  ];

  const links =
    role === "Citizen"
      ? citizenLinks
      : employeeLinks;

  return (
    <header className="sticky top-0 z-50 bg-[#FEFEFE] border-b border-[#CCCCCC]">
      <div className="max-w-7xl mx-auto h-18 px-6 flex items-center justify-between">

        <div
          className="text-2xl font-bold tracking-wide text-[#2F2F2F] cursor-pointer"
          onClick={() =>
            navigate(
              role === "Citizen"
                ? "/citizen/dashboard"
                : "/employee/dashboard"
            )
          }
        >
          CivicAI
        </div>

        <nav className="flex items-center gap-8">

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-200 font-medium ${
                location.pathname === link.path
                  ? "text-[#2F2F2F]"
                  : "text-[#666666]"
              } hover:text-[#2F2F2F]`}
            >
              {link.name}
            </Link>
          ))}

        </nav>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl border border-[#CCCCCC] bg-[#FEFEFE] text-[#2F2F2F] hover:bg-[#E0E7D7] transition-all duration-200"
        >
          Logout
        </button>

      </div>
    </header>
  );
}

export default Navbar;