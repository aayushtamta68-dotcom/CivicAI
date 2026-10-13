import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import complaintService from "../../services/complaintService";


function MyComplaints() {

  const navigate = useNavigate();


  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchComplaints();
  }, []);



  const fetchComplaints = async () => {

    try {

      const res =
        await complaintService.getMyComplaints();

      setComplaints(
        res.data.data || []
      );


    } catch (error) {

      toast.error(
        "Failed to load complaints."
      );


    } finally {

      setLoading(false);

    }

  };



  const getStatusColor = (status) => {

    switch (status?.toLowerCase()) {

      case "resolved":
        return "bg-[#E0E7D7] text-[#2F2F2F]";


      case "in progress":
        return "bg-[#CCCCCC] text-[#2F2F2F]";


      case "rejected":
        return "bg-[#BA9A91] text-white";


      default:
        return "bg-[#B7C396] text-[#2F2F2F]";

    }

  };



  const getPriorityColor = (priority) => {

    switch (priority?.toLowerCase()) {

      case "high":
        return "bg-[#BA9A91] text-white";


      case "medium":
        return "bg-[#E0E7D7] text-[#2F2F2F]";


      default:
        return "bg-[#B7C396] text-[#2F2F2F]";

    }

  };




  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-[#666666]
      ">

        Loading complaints...

      </div>

    );

  }




  return (

    <div className="
      min-h-screen
      bg-[#EDECEC]
    ">


      <main className="
        max-w-6xl
        mx-auto
        px-6
        py-8
      ">



        <div className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
          mb-8
        ">


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-[#2F2F2F]
            ">

              Complaint History

            </h1>


            <p className="
              mt-2
              text-[#666666]
            ">

              Track the status of your submitted complaints.

            </p>


          </div>




          <button

            onClick={() =>
              navigate("/citizen/dashboard")
            }

            className="
              px-5
              py-3
              rounded-xl
              bg-[#B7C396]
              text-[#2F2F2F]
              font-medium
              hover:bg-[#E0E7D7]
              transition
            "

          >

            Back to Dashboard

          </button>



        </div>





        {
          complaints.length === 0 ? (

            <div className="
              bg-[#FEFEFE]
              border
              border-[#CCCCCC]
              rounded-xl
              p-10
              text-center
            ">


              <h2 className="
                text-xl
                font-semibold
                text-[#2F2F2F]
              ">

                No Complaints Found

              </h2>


              <p className="
                mt-2
                text-[#666666]
              ">

                You have not submitted any complaints yet.

              </p>


            </div>


          ) : (


            <div className="space-y-6">


              {
                complaints.map((complaint) => (

                  <div

                    key={
                      complaint.complaint_id
                    }

                    className="
                      bg-[#FEFEFE]
                      border
                      border-[#CCCCCC]
                      rounded-xl
                      p-6
                    "

                  >



                    <div className="
                      flex
                      flex-col
                      md:flex-row
                      md:justify-between
                      gap-6
                    ">


                      <div className="flex-1">


                        <h2 className="
                          text-xl
                          font-semibold
                          text-[#2F2F2F]
                        ">

                          {complaint.title}

                        </h2>



                        <p className="
                          mt-2
                          text-[#666666]
                        ">

                          {complaint.description}

                        </p>



                        <p className="
                          text-sm
                          text-[#666666]
                          mt-4
                        ">

                          <strong>
                            Location:
                          </strong>{" "}

                          {complaint.location}

                        </p>




                        <p className="
                          text-sm
                          text-[#666666]
                        ">

                          <strong>
                            Created:
                          </strong>{" "}

                          {
                            new Date(
                              complaint.created_at
                            ).toLocaleString()
                          }

                        </p>



                      </div>





                      <div className="
                        flex
                        flex-col
                        items-start
                        md:items-end
                        gap-3
                      ">



                        <span className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                          ${getStatusColor(
                            complaint.status
                          )}
                        `}>

                          {complaint.status}

                        </span>





                        <span className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                          ${getPriorityColor(
                            complaint.priority
                          )}
                        `}>

                          {complaint.priority} Priority

                        </span>




                        <button

                          onClick={() =>
                            navigate(
                              `/citizen/complaints/${complaint.complaint_id}`
                            )
                          }

                          className="
                            px-5
                            py-2
                            rounded-xl
                            bg-[#2F2F2F]
                            text-white
                            hover:bg-[#666666]
                            transition
                          "

                        >

                          View Details

                        </button>



                      </div>



                    </div>



                  </div>


                ))
              }



            </div>


          )
        }




      </main>


    </div>

  );

}


export default MyComplaints;