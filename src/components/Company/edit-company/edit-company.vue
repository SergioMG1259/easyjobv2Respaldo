<template>
 <v-dialog width="600px" v-model="dialog" persistent>
   <v-card>
     <div>
       <v-text-field
           label="Nombre de la empresa" class="form-edit" v-model="name_company_edit"
       ></v-text-field>
       <v-text-field
           label="Imagen de perfil" class="form-edit" v-model="img_edit"
       ></v-text-field>
       <v-textarea
           label="Descripción" class="form-edit" v-model="description_edit"
       >
       </v-textarea>
     </div>
     <v-card-actions>
       <v-btn @click="close_dialog">Cancel</v-btn>
       <v-btn @click="edit_profile_company">Save</v-btn>
     </v-card-actions>
   </v-card>
 </v-dialog>
</template>

<script>
import ProfileCompanyServices from '@/core/services/profile-company-api.services'
export default {
  name: "edit-company",
  props:["dialog"],
  data:()=>({
    id_edit:0,
    data_edit:null,
    name_company_edit:" ",
    img_edit:" ",
    description_edit:" ",
  }),
  methods:{
    get_company_to_edit(){
      ProfileCompanyServices.get_profile_company_by_id(this.id_edit).then(response=>{
        this.data_edit=response.data
        this.name_company_edit=this.data_edit.name
        this.img_edit=this.data_edit.imgCompany
        this.description_edit=this.data_edit.description
      }).catch(e=>{
        console.log(e);
      })
    },
    close_dialog(){
      this.name_company_edit=this.data_edit.name
      this.img_edit=this.data_edit.imgCompany
      this.description_edit=this.data_edit.description
      this.$emit('close_edit',false)
    },
    edit_profile_company(){
      const data={
        name:this.name_company_edit,
        description:this.description_edit,
        imgCompany:this.img_edit
      }
      ProfileCompanyServices.edit_profile_company(this.id_edit,data).then(response=>{
        console.log(response)
      }).catch(e=>{
        console.log(e);
      })
      this.close_dialog()
    }
  },
  mounted() {
    this.id_edit=this.$route.params.id
    this.get_company_to_edit()
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