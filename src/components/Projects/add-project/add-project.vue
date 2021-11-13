<template>
  <v-dialog width="600px" v-model="dialogAdd" persistent>
    <v-card >
      <div class="container-form">
        <v-text-field
            label="Titulo" class="form-edit" v-model="title_add"
        ></v-text-field>
        <v-textarea
            label="Descripción" class="form-edit" v-model="description_add"
        >
        </v-textarea>
        <v-text-field
            label="Imagen del proyecto" class="form-edit" v-model="img_add"
        ></v-text-field>
        <v-select
            label="Repositorios de Github"
            :items="repositories"
            single-line
            return-object
            item-text="name"
            item-value="link"
            v-model="repository_add"
            class="form-edit"
        >
        </v-select>
      </div>
      <v-card-actions>
        <v-btn @click="close_dialog_add">Cancel</v-btn>
        <v-btn @click="add_project" >Add</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import ProjectApiServices from '@/core/services/project-api.services'
import RepositoriesApiServices from '@/core/services/repositories-api.services'
import ProfilePostulantServices from '@/core/services/profile-postulant-api.services'
export default {
  name: "add-project",
  props:["dialogAdd"],
  data:()=>({
    id_postulant_add:0,
    id_project:0,
    title_add:" ",
    description_add:" ",
    img_add:" ",
    repository_add:{name:" ",link:" "},
    repositories:[]
  }),
  methods:{
    id_project_auto_generate(){
      ProjectApiServices.getAll().then(response=>{
        let projects=response.data
        this.id_project=projects[projects.length-1].id+1
      }).catch(e=>{
        console.log(e);
      })
    },
    get_all_repositories(value){
      RepositoriesApiServices.get_repositories_by_username(value).then(response=>{
        let raw_repositories=response.data
        for(let i=0;i<raw_repositories.length;i++){
          this.repositories.push({
            name:raw_repositories[i].name.toString(),
            link: raw_repositories[i].html_url.toString(),
          })
        }
      })
    },
    get_all_repositories_to_add(){
      let username_github
      ProfilePostulantServices.get_profile_postulant_by_id(this.id_postulant_add).then(response=>{
        let postulant=response.data

       username_github=postulant.nameGithub
        this.get_all_repositories(username_github)
      })
      console.log(username_github)

    },
    close_dialog_add(){
      this.$emit('close_add',false)
    },
    add_project(){
      const data={
        id:this.id_project,
        title:this.title_add,
        description:this.description_add,
        postulantId:this.id_postulant_add,
        linkToGithub: this.repository_add.link,
        imgProject:this.img_add,
      }
      ProjectApiServices.add_project(data).then(response=>{
        console.log(response)
      }).catch(e=>{
        console.log(e);
      })
      this.close_dialog_add()
    },
  },
  mounted() {
    this.id_postulant_add=this.$route.params.id
    this.id_project_auto_generate()
    this.get_all_repositories_to_add()
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