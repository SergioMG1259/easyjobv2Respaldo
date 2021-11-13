import http from "./http-common"
class EvidencesApiServices {
    getAll(){
        return http.get("/Evidences");
    }
    get_evidences_by_project(id){
        return http.get(`/Evidences?projectId=${id}`);
    }
    add_evidences(data){
        return http.post(`/Evidences`,data)
    }
    get_evidence_by_id(id){
        return http.get(`/Evidences/${id}`);
    }
    edit_evidence(id,data){
        return http.patch(`/Evidences/${id}`,data);
    }
}
export default new EvidencesApiServices();