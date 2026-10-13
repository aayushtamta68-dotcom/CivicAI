import Navbar from "../components/layout/Navbar";

function EmployeeLayout({ children }) {

  return (
    <div className="min-h-screen bg-[#EDECEC]">

      <Navbar role="Employee" />

      <main>
        {children}
      </main>

    </div>
  );

}

export default EmployeeLayout;