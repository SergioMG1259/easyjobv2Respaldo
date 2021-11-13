<template>
  <v-container>
    <v-text-field
        v-model="search"
        clearable
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Especialidad o experiencia requerida"
    ></v-text-field>
    <div class="scroll">
      <div v-for="item in postulants" :key="item.id">
        <v-card class="card-an">
          <v-img :src="item.imgPostulant" max-width="100px"></v-img>
          <v-card-title >
            {{item.name+" "+item.lastName}}
          </v-card-title>
          <v-card-subtitle>
            {{item.mySpecialty+" | "+item.myExperience}}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn @click="to_view_profile(item.id)">Ver mas</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import ProfilePostulantServices from '@/core/services/profile-postulant-api.services'
import router from "@/router";
export default {
  name: "Search-postulant",
  data:()=>({
    id_company:0,
    list_postulants:[],
    search:""
  }),
  methods:{
    get_all_postulant(){
      ProfilePostulantServices.getAll().then(response=>{
        this.list_postulants=response.data
      })
    },
    to_view_profile(idp){
      router.push(`/company/${this.id_company}/view-profile-postulant/${idp}`)
    }
  },
  computed:{
    postulants: function(){
      return this.list_postulants.filter((item) => {
        return item.mySpecialty.toLowerCase().match(this.search.toLowerCase())||item.myExperience.toLowerCase().match(this.search.toLowerCase());
      })
    }
  },
  mounted() {
    this.id_company=this.$route.params.id
    this.get_all_postulant()
  }
}
</script>

<style scoped>
.scroll{
  max-height: 350px;
  overflow-y: auto;
  overflow-y: scroll;
}
.card-an{
  margin-bottom: 20px;
  border: solid 1px purple;
  border-radius: 10px;
}
</style>