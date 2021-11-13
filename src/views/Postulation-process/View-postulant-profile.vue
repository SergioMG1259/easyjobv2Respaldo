<template>
  <v-container>
    <h1 class="name-section">Perfil de:</h1>
    <div>
      <h2>{{ name+" "+lastname }}</h2>
    </div>
    <v-btn @click="Open_dialog_invitation">Invitar</v-btn>

    <v-row>
      <v-col>
        <div >
          <v-img
              max-height="320px"
              max-width="500px"
              min-width="300px"
              :src="img_profile"
          ></v-img>
        </div>
      </v-col>
      <v-col>
        <p>
          {{description}}
        </p>
        <v-btn class="btn-info" disabled elevation="2">{{ specialty}}</v-btn>
        <v-btn class="btn-info" disabled elevation="2">{{experience}}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <h2>Proyectos</h2>
    </v-row>
    <v-row>
      <v-col v-for="project in projects_postulant" :key="project.id">
        <v-card
            class="mx-auto my-12"
            max-width="374"
            @click="view_project_postulant(project.id)"
        >
          <v-card-title>{{ project.title }}</v-card-title>
          <v-img height="250" :src="project.imgProject"></v-img>
          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <Invitation :dialog="dialog_invitation" @close_dialog_invitation="close_dialog_invitation"></Invitation>
  </v-container>
</template>

<script>
import ProfilePostulantServices from '@/core/services/profile-postulant-api.services'
import ProjectApiServices from '@/core/services/project-api.services'
import router from "@/router";
import Invitation from "@/components/Invitation/invitation";
export default {
  name: "View-postulant-profile",
  components: {Invitation},
  data: () => ({
    data_profile:null,
    id_profile:0,
    name:" ",
    lastname:" ",
    description:" ",
    specialty:" ",
    experience:" ",
    img_profile:" ",
    id_company:0,
    projects_postulant:[],
    dialog_invitation:false
  }),
  methods:{
    get_projects(){
      ProjectApiServices.get_project_by_postulant(this.id_profile).then(response=>{
        this.projects_postulant=response.data
      }).catch(e=>{
        console.log(e);
      })
    },
    get_postulant_to_visit() {
      ProfilePostulantServices.get_profile_postulant_by_id(this.id_profile).then(response=>{
        this.data_profile=response.data
        this.name=this.data_profile.name
        this.lastname=this.data_profile.lastName
        this.description=this.data_profile.description
        this.specialty=this.data_profile.mySpecialty
        this.experience=this.data_profile.myExperience
        this.img_profile=this.data_profile.imgPostulant
      }).catch(e=>{
        console.log(e);
      })
      this.get_projects()
    },
    view_project_postulant(n) {
      router.push(`/view-profile-postulant/project/${n}`)
    },
    Open_dialog_invitation(){
      this.$emit('get_invitation',this.id_company,this.id_profile)
      this.dialog_invitation=true
    },
    close_dialog_invitation(value){
      this.dialog_invitation=value
    }
  },
  mounted() {
    this.id_profile=this.$route.params.idp
    this.id_company=this.$route.params.id
    console.log(this.id_company)
    this.get_postulant_to_visit()
  }
}
</script>

<style scoped>
.btn-info{
  margin-left: 25px;
}
.name-section{
  text-align: left;
}
</style>