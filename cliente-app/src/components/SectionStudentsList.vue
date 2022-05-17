<template>
    <v-container class="section-students-list">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">
                            Registro Acadêmico
                        </th>
                        <th class="text-center">
                            Nome
                        </th>
                        <th class="text-center">
                            CPF
                        </th>
                        <th class="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in studentsListData"
                        :key="item.name"
                        >
                        <td class="text-center">{{ item.ra }}</td>
                        <td class="text-center">{{ item.name }}</td>
                        <td class="text-center">{{ item.cpf.toString().replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4") }}</td>
                        <td class="text-center"><v-icon @click="editeStudent(index)">mdi-pencil</v-icon> <v-icon class="ml-2" @click="deletClick(index)">mdi-delete</v-icon> </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        
        
        <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="dialog"
        >
        
        <template v-slot:default="dialog">
          <v-card v-if="deletFocu >= 0">
            <v-toolbar
              color="primary"
              dark
            >Confirmação</v-toolbar>
            <v-card-text>
              <div class="text-h6 pa-12">Você tem certeza que deseja excluir aluno <b>{{studentsListData[deletFocu].name}}</b></div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Cancelar</v-btn>
              <v-btn
                color="primary"
                dark
                @click="deleteSatudent"
              >deletar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-container>
</template>

<script>

    import axios from "axios"
  export default {
    name: 'SectionStudentsList',

    props:{
        studentsListData: Array
    },

    data () {
      return {
        dialog: false,
        deletFocu: -1
      }
    },

    methods:{
      editeStudent(index){
        var aluno 
        localStorage.setItem('aluno', JSON.stringify(this.studentsListData[index]) );
        this.$router.push({ path: '/alunos/editar' })
      },

      deletClick(index){
          this.deletFocu = index;
          this.dialog = true;
      },

      async deleteSatudent(){
          //this.$refs.observer.validate()
                const URL_BASE = "http://localhost:3000"

                
                var responseData = await axios.get(`${URL_BASE}/api/alunos/${this.studentsListData[this.deletFocu].id}/delete`, this.aluno).then( 
                  (response) => { return response.data },
                  (error) =>{
                    if( error.response.data.message == "The given data was invalid.")
                      return {status: 'input required', errors: error.response.data.errors}
                    else
                      return {status: 'unexpected error', errors: error.response.data.errors}
                });

                if(responseData.status == "ok"){
                  this.$toastr('success', 'Aluno deletado com sucesso')
                  this.$router.go();
                }else{
                  this.$toastr('error', 'Não foi possível deletar o cadastro do aluno', 'Error')
                }
      }
    }

  }
</script>

<style lang="scss">
    .section-students-list{
        .v-icon:hover{
            cursor: pointer;
            color: blue;
        }
    }

    .pa-12 b{
            color:blue;
        }
</style>
