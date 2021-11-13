import http from "./http-common"
class ApplicationsApiServices {
    getAll(){
        return http.get("/Applications");
    }
    get_applications_by_id_announcement(id){
        return http.get(`/Applications?announcementId=${id}`);
    }
    get_application_by_announcement_postulant(idp,ida){
        return http.get(`/Applications?announcementId=${ida}&postulantId=${idp}`);
    }
    get_postulant_application(idp){
        return http.get(`/Applications?postulantId=${idp}`);
    }
    add_application(data){
        return http.post(`/Applications`,data)
    }
    delete_application(id){
        return http.delete(`/Applications/${id}`)
    }
    edit_application(id,data){
        return http.patch(`/Applications/${id}`,data)
    }
}
export default new ApplicationsApiServices();