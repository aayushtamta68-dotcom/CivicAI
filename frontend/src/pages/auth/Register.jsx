import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../../services/authService";


function Register() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    full_name: "",
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



  async function handleRegister(e) {

    e.preventDefault();


    if (
      !form.full_name ||
      !form.email ||
      !form.password
    ) {

      toast.error(
        "Please fill all fields."
      );

      return;

    }



    try {

      setLoading(true);


      await authService.register(form);


      localStorage.setItem(
        "otp_email",
        form.email
      );


      toast.success(
        "OTP sent successfully."
      );


      navigate(
        "/verify-otp"
      );


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed."
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
            text-3xl
            font-bold
            text-[#2F2F2F]
          ">

            Create Account

          </h1>



          <p className="
            mt-3
            text-[#666666]
          ">

            Register as a citizen

          </p>


        </div>





        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >



          <input

            type="text"

            name="full_name"

            placeholder="Full Name"

            value={form.full_name}

            onChange={handleChange}

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




          <input

            type="email"

            name="email"

            placeholder="Email Address"

            value={form.email}

            onChange={handleChange}

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




          <input

            type="password"

            name="password"

            placeholder="Password"

            value={form.password}

            onChange={handleChange}

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





          <button

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
              ? "Creating Account..."
              : "Register"
            }


          </button>




        </form>





        <div className="
          text-center
          mt-6
        ">


          <button

            onClick={() =>
              navigate("/login")
            }

            className="
              px-6
              py-2.5
              rounded-xl
              border
              border-[#CCCCCC]
              text-[#2F2F2F]
              font-medium
              hover:bg-[#EDECEC]
              transition
            "

          >

            Back to Login

          </button>



        </div>




      </div>


    </div>

  );

}


export default Register;