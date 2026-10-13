import Navbar from "../components/layout/Navbar";

function CitizenLayout({ children }) {

  return (
    <div className="min-h-screen bg-[#EDECEC]">

      <Navbar role="Citizen" />

      <main>
        {children}
      </main>

    </div>
  );

}

export default CitizenLayout;