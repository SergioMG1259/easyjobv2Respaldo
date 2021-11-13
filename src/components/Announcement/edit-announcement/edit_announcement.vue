<template>
  <v-dialog width="600px" v-model="dialog" persistent>
    <v-card>
      <div>
        <v-text-field
            label="Titulo" class="form-edit" v-model="title_edit"
        ></v-text-field>

        <v-select
            class="form-edit"
            dense
            label="Especialidad requerida"
            :items="specialties"
            v-model="specialty_edit"
            return-object
        >
        </v-select>
        <v-select
            class="form-edit"
            dense
            label="Experiencia requerida"
            :items="experiences"
            v-model="experience_edit"
            return-object
        >
        </v-select>
        <v-text-field
            label="Salario" class="form-edit" v-model="salary_edit"
        ></v-text-field>
        <v-select
            class="form-edit"
            dense
            label="Moneda"
            :items="money"
            v-model="money_edit"
            return-object
        ></v-select>
        <v-textarea
            label="Descripcion" class="form-edit" v-model="description_edit"
        ></v-textarea>
        <v-card-actions>
          <v-btn @click="close_dialog">Cancel</v-btn>
          <v-btn @click="edit_announcement">Save</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import AnnouncementApiServices from '@/core/services/announcement-api.services'
export default {
  name: "edit_announcement",
  props:["dialog"],
  data:()=>({
    id_announcement_to_edit:0,
    id_company_to_edit:0,
    data_edit:null,

    title_edit:" ",
    description_edit:" ",
    specialties:['Ciencia de datos','Desarrollo movil','Diseño gráfico','Programación','Desarrollo web','Ux design'],
    specialty_edit:' ',
    experiences:['Practicante','Junior','Semi-Senior','Senior'],
    experience_edit:' ',
    salary_edit:0,
    money:['ARS','BRL','CLP','COP','MXN','PEN','USD'],
    money_edit:" ",
  }),
  methods:{
    close_dialog(){
      this.title_edit=this.data_edit.title
      this.description_edit=this.data_edit.description
      this.specialty_edit=this.data_edit.requiredSpecialty
      this.experience_edit=this.data_edit.requiredExperience
      this.salary_edit=this.data_edit.salary
      this.money_edit=this.data_edit.typeMoney
      this.$emit('close_dialog',false)
    },
    get_announcement_to_edit() {
      AnnouncementApiServices.get_announcement_by_id(this.id_announcement_to_edit).then(response=>{
        this.data_edit=response.data
        this.title_edit=this.data_edit.title
        this.description_edit=this.data_edit.description
        this.specialty_edit=this.data_edit.requiredSpecialty
        this.experience_edit=this.data_edit.requiredExperience
        this.salary_edit=this.data_edit.salary
        this.money_edit=this.data_edit.typeMoney
      })
    },
    edit_announcement(){
      this.get_announcement_to_edit()
      const data={
        title:this.title_edit,
        description:this.description_edit,
        requiredSpecialty:this.specialty_edit,
        requiredExperience:this.experience_edit,
        salary:this.salary_edit,
        typeMoney:this.money_edit
      }
      AnnouncementApiServices.edit_announcement(this.id_announcement_to_edit,data).then(response=>{
        console.log(response)
      })
      this.close_dialog()
    },
  },
  mounted() {
    this.id_company_to_edit=this.$route.params.id
    this.id_announcement_to_edit=this.$route.params.ida
    this.get_announcement_to_edit()
  }
}
</script>

<style scoped>

</style>