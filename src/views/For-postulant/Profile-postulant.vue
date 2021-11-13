<template>
  <v-container>
    <h1 class="name-section">Mi perfil</h1>
    <div>
      <h2>{{ name+" "+lastname }}</h2>
      <v-btn @click="Open_dialog_edit_profile">editar</v-btn>
    </div>

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
        <h2>Mis proyectos</h2>
        <v-btn @click="Open_dialog_add_project">Add</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="project in projects_postulant" :key="project.id">
        <v-card
            class="mx-auto my-12"
            max-width="374"
            @click="view_project(id_profile,project.id)"
        >
          <v-card-title>{{ project.title }}</v-card-title>
          <v-img height="250" :src="project.imgProject"></v-img>
          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <EditPostulant :dialog="dialog_edit_profile" @close_edit="close_edit" ></EditPostulant>
    <AddProject :dialog-add="dialog_add_project" @close_add="close_add"></AddProject>
  </v-container>
</template>

<script>
import ProfilePostulantServices from '@/core/services/profile-postulant-api.services'
import EditPostulant from '@/components/Postulant/edit-postulant/edit-postulant'
import ProjectApiServices from '@/core/services/project-api.services'
import AddProject from "@/components/Projects/add-project/add-project";

import router from "@/router";

export default {
  name: "Profile-postulant",
  components: {AddProject, EditPostulant},
  data: () => ({
    data_profile:null,
    id_profile:0,
    name:" ",
    lastname:" ",
    description:" ",
    specialty:" ",
    experience:" ",
    img_profile:" ",

    dialog_edit_profile:false,
    dialog_add_project:false,

    projects_postulant:[]

  }),
  methods:{
    get_profile(){
      ProfilePostulantServices.get_profile_postulant_by_id(this.id_profile).then(response=>{
        this.data_profile=response.data
        this.name=this.data_profile.name
        this.lastname=this.data_profile.lastName
        this.description=this.data_profile.description
        this.specialty=this.data_profile.mySpecialty
        this.experience=this.data_profile.myExperience
        this.img_profile=this.data_profile.imgPostulant

        console.log(this.data_profile)
      }).catch(e=>{
        console.log(e);
      })
    },
    Open_dialog_edit_profile(){
      this.dialog_edit_profile=true
    },
    close_edit(value){
      this.dialog_edit_profile=value
    },
    get_projects_postulant(){
      ProjectApiServices.get_project_by_postulant(this.id_profile).then(response=>{
        this.projects_postulant=response.data
      }).catch(e=>{
        console.log(e);
      })
    },
    view_project(n,m){
      router.push(`/postulant/${n}/project/${m}`)
    },
    Open_dialog_add_project(){
      this.dialog_add_project=true
    },
    close_add(value){
      this.dialog_add_project=value
    }
  },
  mounted() {
    this.id_profile=this.$route.params.id
    this.get_profile()
    this.get_projects_postulant()
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