<template>
  <v-dialog width="600px" v-model="dialog" persistent>
    <v-card >
      <div class="container-form">
        <v-text-field
            label="Titulo" class="form-edit" v-model="title_add"
        ></v-text-field>
        <v-textarea
            label="Descripcion" class="form-edit" v-model="description_add"
        ></v-textarea>
        <v-select
            class="form-edit"
            dense
            label="Especialidad requerida"
            :items="specialties"
            v-model="select_specialty"
            return-object
        >
        </v-select>
        <v-select
            class="form-edit"
            dense
            label="Experiencia requerida"
            :items="experiences"
            v-model="select_experience"
            return-object
        >
        </v-select>
        <v-text-field
            label="Salario" class="form-edit" v-model="salary_add"
        ></v-text-field>
        <v-select
            class="form-edit"
            dense
            label="Moneda"
            :items="money"
            v-model="type_money_add"
            return-object
        ></v-select>

        <v-card-actions class="form-edit">
          <v-switch
              v-model="visible_add"
              label="Visible"
          >
          </v-switch>
        </v-card-actions >
        <v-card-actions class="form-edit">
          <v-btn @click="close_dialog_add_announcement">Cancel</v-btn>
          <v-btn @click="add_announcement">Add</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import AnnouncementApiServices from '@/core/services/announcement-api.services'
export default {
  name: "add-announcement",
  props:["dialog"],
  data:()=>({
    id_announcement:0,
    id_company_add:0,
    title_add:" ",
    description_add:" ",
    specialties:['Ciencia de datos','Desarrollo movil','Diseño gráfico','Programación','Desarrollo web','Ux design'],
    select_specialty:' ',
    experiences:['Practicante','Junior','Semi-Senior','Senior'],
    select_experience:' ',
    salary_add:0,
    money:['ARS','BRL','CLP','COP','MXN','PEN','USD'],
    type_money_add:" ",
    visible_add:false,
  }),
  methods:{
    close_dialog_add_announcement(){
      this.title_add=" "
      this.description_add=" "
      this.select_specialty=" "
      this.select_experience=" "
      this.salary_add=0
      this.type_money_add=" "
      this.visible_add=false
      this.$emit('close_dialog',false)
    },
    get_id_to_add(){
      AnnouncementApiServices.getAll().then(response=>{
        let all_announcements=response.data
        this.id_announcement=all_announcements[all_announcements.length-1].id+1
      })
    },
    add_announcement(){
      this.get_id_to_add()
      const data={
        id:this.id_announcement,
        title:this.title_add,
        description:this.description_add,
        requiredSpecialty:this.select_specialty,
        requiredExperience:this.select_experience,
        salary:this.salary_add,
        typeMoney:this.type_money_add,
        visible:this.visible_add,
        date:"11/15/2021",
        companyId:this.id_company_add
      }
      AnnouncementApiServices.add_announcement(data).then(response=>{
        console.log(response)
      }).catch(e=>{
        console.log(e);
      })
      this.close_dialog_add_announcement()
    }
  },
  mounted() {
   this.id_company_add=this.$route.params.iduser
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