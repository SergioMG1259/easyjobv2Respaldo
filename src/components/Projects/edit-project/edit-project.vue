<template>
  <v-dialog width="600px" v-model="dialog" persistent>
    <v-card>
      <v-text-field label="titulo" class="form-edit" v-model="title_edit">

      </v-text-field>
      <v-text-field label="imagen" class="form-edit" v-model="img_edit">

      </v-text-field>
      <v-textarea label="descripcion" class="form-edit" v-model="description_edit">

      </v-textarea>
      <v-select
          :items="repositories_edit"
          single-line
          item-text="name"
          item-value="link"
          label="Repositorio de Github"
          v-model="repository_select"
          class="form-edit"
          return-object
      >
      </v-select>
      <v-card-actions>
        <v-btn @click="close_dialog">Cancel</v-btn>
        <v-btn @click="edite_project">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ProjectApiServices from '@/core/services/project-api.services'
import RepositoriesApiServices from '@/core/services/repositories-api.services'
import ProfilePostulantServices from '@/core/services/profile-postulant-api.services'
export default {
  name: "edit-project",
  props:["dialog"],
  data:()=>({
    id_project:0,
    id_postulant:0,
    data_edit:null,
    title_edit:" ",
    img_edit:" ",
    description_edit:" ",
    //link_github_edit:" ",
    repositories_edit:[],
    repository_select: {name:" ",link:" "},
    username:" "
  }),
  methods:{
    close_dialog(){
      this.$emit('close_edit',false)
    },
    get_project_to_edit(){
      ProjectApiServices.get_project_by_id(this.id_project).then(response=>{
        this.data_edit=response.data

        this.title_edit=this.data_edit.title
        this.img_edit=this.data_edit.imgProject
        this.description_edit=this.data_edit.description
       // this.link_github_edit=this.data_edit.linktogithub
        this.repository_select.link=this.data_edit.linkToGithub

      }).catch(e=>{
        console.log(e);
      })
    },
    get_repositories(){
      RepositoriesApiServices.get_repositories_by_username(this.username).then(response=>{
        let raw_repositories=response.data
        for(let i=0;i<raw_repositories.length;i++){
          this.repositories_edit.push({
            name:raw_repositories[i].name.toString(),
            link: raw_repositories[i].html_url.toString(),
          })
        }
        for(let i=0;i<this.repositories_edit.length;i++){
          if(this.repositories_edit[i].link==this.repository_select.link){
            this.repository_select.name=this.repositories_edit[i].name
          }
        }
      })
    },
    get_repositories_to_edit(){
      ProfilePostulantServices.get_profile_postulant_by_id(this.id_postulant).then(response=>{
        let aux=response.data
        this.username=aux.nameGithub
        this.get_repositories()
      }).catch(e=>{
        console.log(e);
      })
    },
    edite_project(){
      const data={
        title:this.title_edit,
        description:this.description_edit,
        linkToGithub:this.repository_select.link,
        imgProject:this.img_edit
      }
      ProjectApiServices.edit_project(this.id_project,data).then(response=>{
        console.log(response)
      }).catch(e=>{
        console.log(e);
      })
      this.close_dialog()
    }
  },
  mounted() {
    this.id_postulant=this.$route.params.id
    this.id_project=this.$route.params.idp

    this.get_project_to_edit()
    this.get_repositories_to_edit()
  }
}
</script>

<style scoped>
.form-edit{
  width: 320px;
  align-content: center;
  margin-left: 12%;
  margin-top: 10px;
}
</style>