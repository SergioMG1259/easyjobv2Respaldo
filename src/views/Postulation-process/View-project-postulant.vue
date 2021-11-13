<template>
  <v-container>
  <div>
    <h2>{{title_project}}</h2>
    <v-row>
      <v-col>
        <div>
          <v-img
              max-height="320"
              max-width="500"
              :src="img_project"
              class="img-project"
          >
          </v-img>
        </div>
      </v-col>
      <v-col>
        <p class="description">
          {{description_project}}
        </p>
        <v-btn :href="link_github" target="_blank">Git hub</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <h2>Evidencias</h2>
    </v-row>
    <v-row>
      <v-col v-for="evidence in evidences" :key="evidence.id">
        <v-card
            class="mx-auto my-12"
            max-width="374"
        >
          <v-card-title>{{ evidence.title }}</v-card-title>
          <v-img height="250" :src="evidence.imgEvidence"></v-img>
          <v-divider class="mx-4"></v-divider>
        </v-card>

      </v-col>
    </v-row>
  </div>
  </v-container>
</template>

<script>
import ProjectApiServices from '@/core/services/project-api.services'
import EvidencesApiServices from '@/core/services/evidences-api.service'
export default {
  name: "View-project-postulant",
  data:()=>({
    id_postulant:0,
    id_proyect:0,
    data_project:null,
    title_project:" ",
    description_project:" ",
    img_project:" ",
    link_github:" ",

    dialog_edit:false,
    username_github:" ",
    evidences:[],
  }),
  methods:{
    get_project_to_visit(){
      ProjectApiServices.get_project_by_id(this.id_proyect).then(response=>{
        this.data_project=response.data
        this.title_project=this.data_project.title
        this.description_project=this.data_project.description
        this.img_project=this.data_project.imgProject
        this.link_github=this.data_project.linkToGithub
      }).catch(e=>{
        console.log(e);
      })
    },
    get_evidences_by_project(){
      EvidencesApiServices.get_evidences_by_project(this.id_proyect).then(response=>{
        this.evidences=response.data
      }).catch(e=>{
        console.log(e);
      })
    }
  },
  mounted() {
    this.id_proyect=this.$route.params.ida
    this.get_project_to_visit()
    this.get_evidences_by_project()
  }
}
</script>

<style scoped>
.img-project{
  margin-left: 10%;
}
.description{
  margin-right: 5%;
}
</style>