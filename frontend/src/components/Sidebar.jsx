import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-blue-400">
          CivicAI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Employee Portal
        </p>

      </div>

      <nav className="flex-1 mt-6">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}

      </nav>

      <div className="p-6">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;