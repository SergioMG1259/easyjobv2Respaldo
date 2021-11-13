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
      <div v-for="item in announcements" :key="item.id">
        <v-card class="card-an">
          <v-card-title >
            {{item.title}}
          </v-card-title>
          <v-card-subtitle>{{ item.requiredSpecialty+" | "+item.requiredExperience }}</v-card-subtitle>
          <v-card-subtitle>{{ item.date }}</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="to_postulation(id_postulant_to_postulation,item.id)">Ver mas</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import AnnouncementApiServices from '@/core/services/announcement-api.services'
import router from "@/router";
export default {
  name: "Practicants-postulant",
  data:()=>({
    id_postulant_to_postulation:0,
    list_announcements_practicing:[],
    search:"",
  }),
  methods:{
    get_all_announcements_practicing(){
      AnnouncementApiServices.get_all_practicing().then(response=>{
        this.list_announcements_practicing=response.data
        this.list_announcements_practicing.sort((a, b) => {
          let key1 = new Date(a.date);
          let key2 = new Date(b.date);
          if (key1 > key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        })
      }).catch(e=>{
        console.log(e);
      })
    },
    to_postulation(n,m){
      router.push(`/postulant/${n}/announcement-postulation/${m}`)
    }
  },
  computed:{
    announcements: function(){
      return this.list_announcements_practicing.filter((item) => {
        return item.requiredSpecialty.toLowerCase().match(this.search.toLowerCase());
      })
    }
  },
  mounted() {
    this.id_postulant_to_postulation=this.$route.params.id
    this.get_all_announcements_practicing()
  }
}
</script>

<style scoped>
.scroll{
  max-height: 350px;
  overflow-y: auto;
  overflow-y: scroll;
}
</style>