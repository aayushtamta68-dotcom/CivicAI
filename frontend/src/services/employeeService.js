import api from "./api";
import API_ENDPOINTS from "../constants/apiEndpoints";

const employeeService = {

  getComplaints() {
    return api.get(
      API_ENDPOINTS.EMPLOYEE.COMPLAINTS
    );
  },


  getComplaintDetails(id) {
    return api.get(
      API_ENDPOINTS.EMPLOYEE.DETAILS(id)
    );
  },


  updateComplaint(id, data) {
    return api.put(
      API_ENDPOINTS.EMPLOYEE.UPDATE(id),
      data
    );
  },

};


export default employeeService;