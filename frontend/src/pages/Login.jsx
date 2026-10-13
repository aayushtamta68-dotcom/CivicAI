import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../services/authService";


function Login() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);



  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }



  async function handleLogin(e) {

    e.preventDefault();


    if (!form.email.trim() || !form.password.trim()) {

      toast.error(
        "Please fill all fields."
      );

      return;

    }



    try {

      setLoading(true);


      const response =
        await authService.login(form);



      const {
        token,
        user
      } = response.data.data;



      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );



      toast.success(
        "Login successful."
      );



      if (user.role === "Employee") {

        navigate(
          "/employee/dashboard"
        );

      }

      else if (user.role === "Citizen") {

        navigate(
          "/citizen/dashboard"
        );

      }

      else {

        toast.error(
          "Unknown user role."
        );

      }



    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Login failed."
      );


    } finally {

      setLoading(false);

    }

  }




  return (

    <div className="
      min-h-screen
      bg-[#EDECEC]
      flex
      items-center
      justify-center
      px-6
    ">


      <div className="
        w-full
        max-w-md
        bg-[#FEFEFE]
        border
        border-[#CCCCCC]
        rounded-2xl
        shadow-sm
        p-8
      ">



        <div className="text-center mb-8">


          <h1 className="
            text-4xl
            font-bold
            text-[#2F2F2F]
          ">

            CivicAI

          </h1>



          <p className="
            mt-3
            text-[#666666]
          ">

            AI Powered Civic Grievance Management System

          </p>


        </div>





        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >



          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-[#2F2F2F]
            ">

              Email Address

            </label>



            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              placeholder="Enter your email"

              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-[#CCCCCC]
                bg-white
                text-[#2F2F2F]
                outline-none
                focus:border-[#B7C396]
              "

            />

          </div>





          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-[#2F2F2F]
            ">

              Password

            </label>



            <input

              type="password"

              name="password"

              value={form.password}

              onChange={handleChange}

              placeholder="Enter your password"

              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-[#CCCCCC]
                bg-white
                text-[#2F2F2F]
                outline-none
                focus:border-[#B7C396]
              "

            />

          </div>






          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              py-3
              rounded-xl
              bg-[#B7C396]
              text-[#2F2F2F]
              font-semibold
              hover:bg-[#E0E7D7]
              transition
              disabled:opacity-60
            "

          >

            {
              loading
              ? "Signing In..."
              : "Sign In"
            }


          </button>




        </form>





        <div className="
          text-center
          mt-6
        ">


          <p className="
            text-sm
            text-[#666666]
          ">

            Don't have an account?

          </p>



          <button

            onClick={() =>
              navigate("/register")
            }

            className="
              mt-3
              px-6
              py-2.5
              rounded-xl
              border
              border-[#B7C396]
              bg-[#FEFEFE]
              text-[#2F2F2F]
              font-semibold
              hover:bg-[#E0E7D7]
              transition
            "

          >

            Create Citizen Account

          </button>



        </div>





      </div>


    </div>

  );

}


export default Login;