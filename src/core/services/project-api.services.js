import http from "./http-common"
class ProjectApiServices {
    getAll(){
        return http.get("/Projects");
    }
    get_project_by_postulant(id){
        return http.get(`/Projects?postulantId=${id}`);
    }
    get_project_by_id(id){
        return http.get(`/Projects/${id}`);
    }
    edit_project(id,data){
        return http.patch(`/Projects/${id}`,data)
    }
    add_project(data){
        return http.post(`/Projects`,data)
    }
}
export default new ProjectApiServices();