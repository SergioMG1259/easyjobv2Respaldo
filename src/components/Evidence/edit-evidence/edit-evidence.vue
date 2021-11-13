<template>
  <v-dialog width="600px" v-model="dialog" persistent>
    <v-card>
      <div class="container-form">
        <v-text-field label="Titulo" class="form-edit" v-model="title_edit">

        </v-text-field>
        <v-text-field label="Link" class="form-edit" v-model="img_edit">

        </v-text-field>
        <v-card-actions class="form-edit">
          <v-btn @click="close_dialg_edit">Cancel</v-btn>
          <v-btn @click="edit_evidence">Edit</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import EvidencesApiServices from '@/core/services/evidences-api.service'
export default {
  name: "edit-evidence",
  props:["dialog"],
  data:()=>({
    id_evidence:0,
    title_edit:"",
    img_edit:"",
    data_evidence:null
  }),
  methods:{
    get_evidence_to_edit(id){
      EvidencesApiServices.get_evidence_by_id(id).then(response=>{
        this.data_evidence=response.data
        this.title_edit=this.data_evidence.title
        this.img_edit=this.data_evidence.imgEvidence
        this.id_evidence=id
       // this.id_evidence=this.data_evidence.id
      })
    },
    close_dialg_edit(){
      this.$emit('close_dialog',false)
    },
    edit_evidence(){
      const data={
        title:this.title_edit,
        imgEvidence:this.img_edit
      }
      EvidencesApiServices.edit_evidence(this.id_evidence,data).then(this.close_dialg_edit)
    },

  },
  created() {
    //this.id_evidence=this.$route.params.idp
    //this.get_evidence_to_edit()
    this.$parent.$on('get_evidence',this.get_evidence_to_edit)
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