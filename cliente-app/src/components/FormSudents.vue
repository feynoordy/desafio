<template>

      <validation-observer ref="observer" v-slot="{ invalid }" tag="div" class="form">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required"
          >
            <v-text-field
              v-model="aluno.name"
              :error-messages="errors"
              label="Name"
              required
              class="mb-4"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="aluno.email"
              :error-messages="errors"
              label="E-mail"
              required
              class="mb-4"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="ra"
            :rules="{
              required: true,
              digits: 6
            }"
          >
            <v-text-field
              v-model="aluno.ra"
              :counter="6"
              :error-messages="errors"
              label="Registro Acadêmico"
              required
              class="mb-4"
              :disabled=" id ? '' : disabled"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="cpf"
            :rules="{
              required: true,
              digits: 11
            }"
          >
            <v-text-field
              v-model="aluno.cpf"
              :counter="11"
              :error-messages="errors"
              label="CPF"
              required
              :disabled=" id ? '' : disabled"
            ></v-text-field>
          </validation-provider>
          

        <div class="text-right mt-5 pt-5">
            <v-btn class="mr-4"> cancelar </v-btn>
            <v-btn @click="cadastrar" :disabled="invalid" color="primary" v-if="!id"> Cadastrar </v-btn>
            <v-btn @click="editar" :disabled="invalid" color="primary" v-else> editar </v-btn>
        </div>
      </validation-observer>

</template>

<script>
    import axios from "axios"
    import { required, digits, email, max, integer} from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

    extend('digits', {
        ...digits,
        message: '{_field_} precisa conter {length} digitos. ({_value_})',
    })

    extend('required', {
        ...required,
        message: 'preencha esse dado',
    })

    extend('max', {
        ...max,
        message: '{_field_} não pode ter mais de {length} characters',
    })

    extend('email', {
        ...email,
        message: 'formato de email invalido. (ex: ex@mail.com) ',
    })

    export default {
      
        name: "FormSudents",

        components: {
            ValidationProvider,
            ValidationObserver,
        },

        props:{
          alunoProps:  { 
            type: Object, 
            default() {
              return {
                name: '',
                cpf: '',
                email: '',
                ra: '',
              }
            } 
          },
          id :{Number}
        },

        data(){
          return {
            aluno :  this.alunoProps
            
          }
        },
        
        methods: {
            async cadastrar () {
                //this.$refs.observer.validate()
                const URL_BASE = "http://localhost:3000"

                
                var responseData = await axios.post(`${URL_BASE}/api/alunos/register`, this.aluno).then( 
                  (response) => { return response.data },
                  (error) =>{
                    if( error.response.data.message == "The given data was invalid.")
                      return {status: 'input required', errors: error.response.data.errors}
                    else
                      return {status: 'unexpected error', errors: error.response.data.errors}
                });

                if(responseData.status == "ok"){
                  this.$toastr('success', 'Aluno cadastrado com sucesso')
                  this.$router.push({ path: '/alunos' })
                }
                else if(responseData.data.code == "ER_DUP_ENTRY"){
                  this.$toastr('error', 'Registro Acadêmico já cadastrado', 'Error')
                }
                else{
                    this.$toastr('error', 'Não foi possivel cadastrar o aluno, tente novamente mais tarde', 'Error')
                }
            },

            async editar () {
                //this.$refs.observer.validate()
                const URL_BASE = "http://localhost:3000"

                
                var responseData = await axios.post(`${URL_BASE}/api/alunos/${this.id}/edite`, this.aluno).then( 
                  (response) => { return response.data },
                  (error) =>{
                    if( error.response.data.message == "The given data was invalid.")
                      return {status: 'input required', errors: error.response.data.errors}
                    else
                      return {status: 'unexpected error', errors: error.response.data.errors}
                });

                if(responseData.status == "ok"){
                  this.$toastr('success', 'Aluno editado com sucesso', 'Sucesso')
                  this.$router.push({ path: '/alunos' })
                }
                else{
                  this.$toastr('error', 'Não foi possível editar o cadastro do aluno', 'Error')
                }
            },
            clear () {
                this.aluno.name = ''
                this.aluno.cpf = ''
                this.aluno.email = ''
                this.aluno.ra = ''
                this.$refs.observer.reset()
            },
        },
        
    };
</script>

