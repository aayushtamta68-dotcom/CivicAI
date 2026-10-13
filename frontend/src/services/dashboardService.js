import api from "./api";
import API_ENDPOINTS from "../constants/apiEndpoints";

const dashboardService = {

  getCitizenDashboard() {
    return api.get(
      API_ENDPOINTS.DASHBOARD.CITIZEN
    );
  },


  getEmployeeDashboard() {
    return api.get(
      API_ENDPOINTS.EMPLOYEE.DASHBOARD
    );
  },

};


export default dashboardService;