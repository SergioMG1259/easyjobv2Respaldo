import http from "./http-common"
class ProfileCompanyServices{
    getAll(){
        return http.get("/Companies");
    }
    get_profile_company_by_id(id){
        return http.get(`/Companies/${id}`);
    }
    edit_profile_company(id,data){
        return http.patch(`/Companies/${id}`,data)
    }

}
export default new ProfileCompanyServices();