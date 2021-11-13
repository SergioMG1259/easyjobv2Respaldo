<template>
 <div>
   <v-btn @click="back">regresar</v-btn>
   <h1>{{ title }}</h1>
   <h2>{{specialty+" | "+experience}}</h2>
   <h4>{{date}}</h4>
   <v-row class="data-announcement">
     <h2>{{salary+" | "+type_money}}</h2>
   </v-row>
   <v-row class="data-announcement">
     <p>{{description}}</p>
   </v-row>
   <v-btn @click="postulate" v-bind:class="{'disable':accepted==true}">{{ action }}</v-btn>
 </div>
</template>

<script>
import AnnouncementApiServices from '@/core/services/announcement-api.services'
import ApplicationsApiServices from '@/core/services/applications-api.services'
import NotificationCompanysApiServices from '@/core/services/notifications-company-api.services'
import router from "@/router";
export default {
  name: "Postulation_Announcement",
  data:()=>({
    id_announcement_applicant:0,
    id_postulant_applicant:0,
    id_application:0,
    data_announcement:null,
    title:" ",
    description:" ",
    specialty:" ",
    experience:" ",
    salary:0,
    type_money:" ",
    date:" ",

    action:"Postular",
    postulating:false,

    id_company_notification:0,
    accepted:false
  }),
  methods:{
    back(){
      router.push(`/postulant/${this.id_postulant_applicant}/list-announcements`)
    },
    get_announcement_to_postulation() {
      AnnouncementApiServices.get_announcement_by_id(this.id_announcement_applicant).then(response=>{
        this.data_announcement=response.data
        this.title=this.data_announcement.title
        this.description=this.data_announcement.description
        this.specialty=this.data_announcement.requiredSpecialty
        this.experience=this.data_announcement.requiredExperience
        this.salary=this.data_announcement.salary
        this.type_money=this.data_announcement.typeMoney
        this.date=this.data_announcement.date
        this.id_company_notification=this.data_announcement.companyId
      }).catch(e=>{
        console.log(e);
      })
    },
    add_notification_for_company(){
      let id_notification=1
      NotificationCompanysApiServices.getAll().then(response=>{
        let all_notifications_company=response.data
        if(all_notifications_company.length>0){
          id_notification=all_notifications_company[all_notifications_company.length-1].id+1
        }
        console.log(id_notification)
        const data={
          id:id_notification,
          companyId:this.id_company_notification,
          announcementId:this.id_announcement_applicant,
          titleAnnouncement:this.title,
          type:"new-postulant"
        }
        NotificationCompanysApiServices.add_notification_company(data)
      })

    },
    add_application(){
      let id_application=1
      ApplicationsApiServices.getAll().then(response=>{
        let all_applications=response.data
        if(all_applications.length>0){
          id_application=all_applications[all_applications.length-1].id+1
        }
        this.id_application=id_application
        const data={
          id:this.id_application,
          postulantId:this.id_postulant_applicant,
          announcementId:this.id_announcement_applicant,
          state:"pending",
        }
        ApplicationsApiServices.add_application(data).then(response=>{
          console.log(response)
          this.add_notification_for_company()
        })
      })

    },
    delete_application(){
      ApplicationsApiServices.delete_application(this.id_application)
    },
    verification_application(){
      let all_application_by_announcement
      ApplicationsApiServices.get_applications_by_id_announcement(this.id_announcement_applicant).then(response=>{
        all_application_by_announcement=response.data
        for(let i=0;i<all_application_by_announcement.length;i++){
          if(all_application_by_announcement[i].postulantId==this.id_postulant_applicant){
            if(all_application_by_announcement[i].state=="accepted"){
              this.accepted=true
            }
            this.id_application=all_application_by_announcement[i].id
            return this.postulating=true, this.action="Cancelar"
          }
        }
        return this.postulating=false, this.action="Postular"
      })
    },
    postulate(){
      if(this.postulating){
        this.postulating=false
        this.delete_application()
        this.action="Postular"
      }
      else{
        this.postulating=true
        this.add_application()
        this.action="Cancel"
      }
    }
  },

  mounted() {
    this.id_announcement_applicant=this.$route.params.ida
    this.id_postulant_applicant=this.$route.params.id
    this.get_announcement_to_postulation()
    this.verification_application()
  }
}
</script>

<style scoped>
.data-announcement{
  margin-left: 20px;
  margin-top: 10px;
  margin-right: 10px;
}
.disable{
  display: none;
}
</style>