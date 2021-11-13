<template>
<v-container>
  <v-btn @click="back">regresar</v-btn>
  <h2>{{title_project}}</h2>
  <v-btn @click="open_dialog_edit" >Editar</v-btn>
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
    <v-btn @click="open_dialog_add_evidence">Add</v-btn>
  </v-row>
  <v-row>
    <v-col v-for="evidence in evidences" :key="evidence.id">
      <v-card
          class="mx-auto my-12"
          max-width="374"
          @click="open_dialog_edit_evidence(evidence.id)"
      >
        <v-card-title>{{ evidence.title }}</v-card-title>
        <v-img height="250" :src="evidence.imgEvidence"></v-img>
        <v-divider class="mx-4"></v-divider>
      </v-card>

    </v-col>
  </v-row>
  <edit-project :dialog="dialog_edit" @close_edit="close_dialog_edit" ></edit-project>
  <add-evidence :dialog="dialog_evidence_add" :project-id-add="this.id_project" @close_dialog="close_dialog_add_evidence"></add-evidence>
  <edit-evidence :dialog="dialog_evidence_edit" @close_dialog="close_dialog_edit_evidence"></edit-evidence>
</v-container>
</template>

<script>
import router from "@/router";
import ProjectApiServices from '@/core/services/project-api.services'
import ProfilePostulantServices from '@/core/services/profile-postulant-api.services'
import EditProject from '@/components/Projects/edit-project/edit-project'
import EvidencesApiServices from '@/core/services/evidences-api.service'
import AddEvidence from "@/components/Evidence/add-evidence/add-evidence";
import EditEvidence from "@/components/Evidence/edit-evidence/edit-evidence";

export default {
  name: "View-Project",
  components: {EditEvidence, AddEvidence, EditProject},
  data:()=>({
    id_postulant:0,
    id_project:0,
    data_project:null,
    title_project:" ",
    description_project:" ",
    img_project:" ",
    link_github:" ",

    dialog_edit:false,
    username_github:" ",
    evidences:[],
    dialog_evidence_add:false,
    dialog_evidence_edit:false,
    id_to_edit:0
  }),
  methods:{
    back(){
      router.push(`/profile-postulant/${this.id_postulant}`)
    },
    get_project(){
      ProjectApiServices.get_project_by_id(this.id_project).then(response=>{
        this.data_project=response.data
        this.title_project=this.data_project.title
        this.description_project=this.data_project.description
        this.img_project=this.data_project.imgProject
        this.link_github=this.data_project.linkToGithub
      }).catch(e=>{
        console.log(e);
      })
    },
    get_repositories(){
      ProfilePostulantServices.get_profile_postulant_by_id(this.id_postulant).then(response=>{
        let postulant=response.data
        this.username_github=postulant.nameGithub
      }).catch(e=>{
        console.log(e);
      })
    },
    get_evidences(){
      EvidencesApiServices.get_evidences_by_project(this.id_project).then(response=>{
        this.evidences=response.data
      }).catch(e=>{
        console.log(e);
      })
    },
    open_dialog_edit(){
      this.dialog_edit=true
    },
    close_dialog_edit(value){
      this.dialog_edit=value
    },
    open_dialog_add_evidence(){
      this.dialog_evidence_add=true
    },
    close_dialog_add_evidence(value){
      this.dialog_evidence_add=value
    },
    open_dialog_edit_evidence(value){
      this.$emit('get_evidence',value)
      this.dialog_evidence_edit=true
      this.id_to_edit=value
    },
    close_dialog_edit_evidence(value){
      this.dialog_evidence_edit=value
    }
  },
  mounted() {
    this.id_postulant=this.$route.params.id
    this.id_project=this.$route.params.idp
    this.get_project()
    this.get_repositories()
    this.get_evidences()
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