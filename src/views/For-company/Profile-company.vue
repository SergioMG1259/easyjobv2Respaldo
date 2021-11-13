<template>
  <v-container>
    <h1 class="name-section">Mi perfil</h1>
    <div>
      <h2>{{ name_company}}</h2>
      <v-btn @click="Open_dialog_edit_profile">editar</v-btn>
    </div>
    <v-row>
      <v-col>
        <div >
          <v-img
              max-height="320"
              max-width="500"
              :src="img_profile"
          ></v-img>
        </div>
      </v-col>

      <v-col>
        <p>
          {{description}}
        </p>

      </v-col>
    </v-row>
    <edit-company :dialog="dialog_edit" @close_edit="Close_dialog_edit_profile"></edit-company>
  </v-container>
</template>

<script>
import ProfileCompanyServices from '@/core/services/profile-company-api.services'
import EditCompany from '@/components/Company/edit-company/edit-company'

export default {
  name: "Profile-company",
  components: {EditCompany},
  data:()=>({
    id_profile_company:0,
    data_company:null,
    name_company:" ",
    img_profile:" ",
    description:" ",

    dialog_edit:false
  }),
  methods:{
    get_profile_company(){
      ProfileCompanyServices.get_profile_company_by_id(this.id_profile_company).then(response=>{
        this.data_company=response.data
        this.name_company=this.data_company.name
        this.description=this.data_company.description
        this.img_profile=this.data_company.imgCompany
      }).catch(e=>{
        console.log(e);
      })
    },
    Open_dialog_edit_profile(){
      this.dialog_edit=true
    },
    Close_dialog_edit_profile(value){
      this.dialog_edit=value
    }
  },
  mounted() {
    this.id_profile_company=this.$route.params.id
    this.get_profile_company()
  }
}
</script>

<style scoped>
.name-section{
  text-align: left;
}
</style>