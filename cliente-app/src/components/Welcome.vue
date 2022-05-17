<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="img/logo.png"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h2 class="display-1 font-weight-bold mb-3">
          Olá! Seja bem vindo.
        </h2>

        <p class="subheading font-weight-regular">
          acesse o menu lateral para consultar ou cadastrar novos alunos
        </p>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Welcome',

  }
</script>
