<template>
  <div class="students-page">
      <div class="section-title mb-5">
          <h2 class="mb-1">Consulta de alunos</h2>
          <hr>
      </div>

      <v-row>
          <v-col cols="8" class="d-flex">
                        
            <v-text-field
                v-model="search"
                label="Pesquisar aluno"
                append-icon="mdi-magnify"
                single-line
                @keyup='searchStudents'
            ></v-text-field> 

          </v-col>
          <v-col cols="4" class="text-center">
            <v-btn
                depressed
                color="primary"
                to="/alunos/cadastrar"                  >
                + Cadastrar Aluno
            </v-btn>
          </v-col>
      </v-row>

      <v-row>
          <section-students-list 
            :studentsListData="studentsListData"
          />
      </v-row>
  </div>
</template>

<script>
  import SectionStudentsList from '../components/SectionStudentsList'
  import axios from "axios"

  export default {
    name: 'Students',

    data(){
      return {
        studentsListData : [],
        search : ""
      }
    },
    

    components: {
        SectionStudentsList
    },

    async created(){

      const URL_BASE = "http://localhost:3000"

      var responseData = await axios.get(`${URL_BASE}/api/alunos/index`).then( 
        (response) => { return response.data },
        (error) =>{
          if( error.response.data.message == "The given data was invalid.")
            return {status: 'input required', errors: error.response.data.errors}
          else
            return {status: 'unexpected error', errors: error.response.data.errors}
      });

      this.studentsListData = responseData.data.students
    },

    methods:{
      async searchStudents(){

        var query = document.querySelector("input").value

        console.log('estou pesquisando '+query)

        const URL_BASE = "http://localhost:3000"
        var URL = `${URL_BASE}/api/alunos/search/${query}`

        if(query == ''){
          URL = `${URL_BASE}/api/alunos/search/@`
        }



        var responseData = await axios.get(URL).then( (response) => { return response.data } );
        console.log(responseData.status)
        if(responseData.status == "ok"){
              this.studentsListData = responseData.data.students;
              
        }
      },
    }

    
  }
</script>

<style lang="scss">
    .students-page{
        padding: 2rem;

        .v-text-field{
                padding-top: 0 !important;
        }
    }
</style>
