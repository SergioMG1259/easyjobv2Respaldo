<template>
  <v-dialog width="600px" v-model="dialog" persistent>
    <v-card>
      <div class="container-form">
        <v-text-field label="Titulo" class="form-edit" v-model="title_add">

        </v-text-field>
        <v-text-field label="Link" class="form-edit" v-model="img_add">

        </v-text-field>
        <v-card-actions class="form-edit">
          <v-btn @click="close_dialog_add_evidence">Cancel</v-btn>
          <v-btn @click="add_evidence">Add</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import EvidencesApiServices from '@/core/services/evidences-api.service'
export default {
  name: "add-evidence",
  props:["dialog","projectIdAdd"],
  data:()=>({
    title_add:"",
    img_add:"",
    id_add:1
  }),
  methods:{
    close_dialog_add_evidence(){
      this.title_add=""
      this.img_add=""
      this.$emit('close_dialog',false)
    },
    add_evidence(){
      EvidencesApiServices.getAll().then(response=>{
        let allEvidences=response.data
        console.log(allEvidences.length)
        if(allEvidences.length>0){
          this.id_add=allEvidences[allEvidences.length-1].id+1
          console.log(this.id_add)
          this.add()
        }
      })
    },
    add(){
      const data={
        id:this.id_add,
        title:this.title_add,
        imgEvidence:this.img_add,
        projectId:this.projectIdAdd
      }
      EvidencesApiServices.add_evidences(data).then(response=>
      {
        console.log(response)
        this.close_dialog_add_evidence()
      }).catch(e=>{
        console.log(e);
      })
    }
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