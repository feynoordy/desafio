<template>
  <div class="register-students-page">
    <div class="section-title mb-5">
      <h2 class="mb-1">Editar Aluno</h2>
      <hr />
    </div>

    <v-row class="mt-5 pt-5 pl-3">
      <form-sudents :alunoProps="aluno" :id="id"/>
    </v-row>
  </div>
</template>

<script>
   
      import FormSudents from '../components/FormSudents'

    
    export default {
        name: "EditStudents",

        components: {
          FormSudents,
        },

        data(){
          return {
            aluno:  {
              id:'',
              name: '',
              cpf: '',
              email: '',
              ra: '',
            },

            id: ''
          }
        },

        beforeRouteEnter(to, from, next) {
            
            var aluno = JSON.parse(localStorage.getItem('aluno'));
            localStorage.removeItem('aluno');

            if(aluno){
                next((vm) => {
                    vm.aluno.name = aluno.name;
                    vm.aluno.cpf = aluno.cpf;
                    vm.aluno.email =aluno.email;
                    vm.aluno.ra = aluno.ra;

                    vm.id = aluno.id
                });
            }
            else{
                next('/alunos')
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
