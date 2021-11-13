import http from "./http-common"
class NotificationsApiServices {
    getAll(){
        return http.get("/Notifications");
    }
    get_by_postulant(id){
        return http.get(`/Notifications?postulantId=${id}`);
    }
    get_company_notification(id){
        return http.get(`/Notifications?companyId=${id}`);
    }
    get_announcement_notification(id){
        return http.get(`/Notifications?announcementId=${id}`);
    }
    get_notifications_postulant(){
        return http.get("/Notifications?type=declined&type=accepted");
    }
    get_all_not_practicing(){
        return http.get(`/Announcements?required_experience_ne=Practicante&visible=true`);
    }
    get_all_practicing(){
        return http.get(`/Announcements?required_experience=Practicante`);
    }
    get_announcement_by_company(id){
        return http.get(`/Announcements?id_company=${id}`);
    }
    get_announcement_by_id(id){
        return http.get(`/Announcements/${id}`);
    }
    edit_announcement(id,data){
        return http.patch(`/Announcements/${id}`,data)
    }
    add_notification(data){
        return http.post(`/Notifications`,data)
    }
}
export default new NotificationsApiServices();