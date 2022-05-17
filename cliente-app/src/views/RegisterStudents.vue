<template>
  <div class="register-students-page">
    <div class="section-title mb-5">
      <h2 class="mb-1">Cadastrar Aluno</h2>
      <hr />
    </div>

    <v-row class="mt-5 pt-5 pl-3">
      <form-sudents/>
    </v-row>
  </div>
</template>

<script>
   
      import FormSudents from '../components/FormSudents'

    
    export default {
        name: "RegisterStudents",

        components: {
          FormSudents,
        },

        data(){
          return {
            aluno:  {
              name: '',
              cpf: '',
              email: '',
              ra: '',
            }
          }
        },
        
    };
</script>

<style lang="scss">
.register-students-page {
  
  padding: 2rem 3rem 2rem 3rem;

  .v-text-field {
    padding-top: 0 !important;
  }

  .form{
      width: 80%;

      
  }
}
</style>
