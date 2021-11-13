import http from "./http-common"
//import https from "./prueba"
class ProfilePostulantServices{
    getAll(){
        return http.get("/postulants");
    }
    get_profile_postulant_by_id(id){
        return http.get(`/postulants/${id}`);
    }
    edit_profile_postulant(id,data){
        return http.patch(`/postulants/${id}`,data)
    }

}
export default new ProfilePostulantServices();