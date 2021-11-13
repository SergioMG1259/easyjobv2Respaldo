import http from "./http-common"
class NotificationCompanysApiServices {
    getAll(){
        return http.get("/Notifications_Company");
    }
    get_notifications_by_company(id){
        return http.get(`/Notifications_Company?companyId=${id}`);
    }
    get_by_announcement(id){
        return http.get(`/Notifications_Company?announcementId=${id}`);
    }
    get_announcement_notification(id){
        return http.get(`/Notifications?id_announcement=${id}`);
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
    add_notification_company(data){
        return http.post(`/Notifications_Company`,data)
    }
}
export default new NotificationCompanysApiServices();