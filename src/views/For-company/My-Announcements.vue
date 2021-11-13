<template>
  <v-container>
    <v-btn @click="sort">ordenar</v-btn>
    <v-btn @click="Open_dialog_add_announcement">Agregar</v-btn>
    <div class="scroll">
      <div v-for="item in company_announcements" :key="item.id">
        <v-card class="card-an" v-bind:class="{'not-visible':item.visible==false}" @click="view_announcement(id_company,item.id)">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.requiredSpecialty+" | "+item.requiredExperience }}</v-card-subtitle>
          <v-card-subtitle>{{ item.date }}</v-card-subtitle>

        </v-card>
      </div>
    </div>
    <AddAnnouncement :dialog="dialog_add" @close_dialog="Close_dialog_add_announcement"></AddAnnouncement>
  </v-container>
</template>

<script>
import AddAnnouncement from '@/components/Announcement/add-announcement/add-announcement'
import AnnouncementApiServices from '@/core/services/announcement-api.services'
import router from "@/router";
export default {
  name: "My-Announcements",
  components: {AddAnnouncement},
  data:()=>({
    id_company:0,
    company_announcements:[],
    //asc:true
    desc:true,
    dialog_add:false
  }),
  methods:{
    get_announcements_company(){
      AnnouncementApiServices.get_announcement_by_company(this.id_company).then(response=>{
        this.company_announcements=response.data
        this.company_announcements.sort((a, b) => {
          let key1 = new Date(a.date);
          let key2 = new Date(b.date);
          if (key1 > key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        })
      }).catch(e=>{
        console.log(e);
      })
    },
    sort(){
      if(this.desc){
        this.company_announcements.sort((a, b) => {
          let key1 = new Date(a.date);
          let key2 = new Date(b.date);

          if (key1 < key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        })
       //this.asc=false
        this.desc=false
      }
      else{
        this.company_announcements.sort((a, b) => {
          let key1 = new Date(a.date);
          let key2 = new Date(b.date);

          if (key1 > key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        })
        //this.asc=true
        this.desc=true
      }
    },
    Open_dialog_add_announcement(){
      this.dialog_add=true
    },
    Close_dialog_add_announcement(value){
      this.dialog_add=value
    },
    view_announcement(n,m){
      router.push(`/company/${n}/announcement/${m}`)
    }
  },
  mounted() {
    this.id_company=this.$route.params.iduser
    this.get_announcements_company()
  }
}
</script>

<style scoped>
.scroll{
  max-height: 350px;
  overflow-y: auto;
  overflow-y: scroll;
}
.card-an{
  margin-bottom: 20px;
  border: solid 1px purple;
  border-radius: 10px;
}
.not-visible{
  opacity: 0.50;
}
</style>