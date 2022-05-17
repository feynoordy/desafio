# Desafio GrupoA Educação - Full Stack Web Developer
Esse repositório contém uma resolução para um desafio Full Stack Web Developer do GrupoA Educação baseado nas **[espessificações solicitadas]**

## Documentação
## Arquitetura
O projeto desenvolvido consiste de duas aplicações: cliente-app e server-app. 
1. cliente-app: aplicação fronte-end contendo a interface com o usuário do sistema
2. sever-app: aplicação back-end contendo a api consumida pelo cliente-app.

## cliente-app
Foi desenvolvido em Vue.JS utilizando a biblioteca de interface Vuetify

## bibliotecas de terceiros utilizadas
1. vee-validate - Utilizada para validar o campos de formulário antes de submeter a persistência dos dados ao cadastra novos alunos
2. deveodk/vue-toastr  - Utilizada para gerar notificações do sistema como mensagens de erros e de sucesso =.

## Inicialização
Acesse o caminho da raiz do projeto cliente-app via termina e execute o comando ***npm install*** para instalar todas as dependência do projeto e em seguida ***npm run serve*** 


## server-app
Desenvolvido com Node.JS baseado no padrão de projeto DAO, isolando o código de acesso ao dados em um único lugar servindo como uma fachada para a 
API para que a regra de negocio não precise se preocupar com os detalhes do banco.

A API foi desenvolvida sobe o Framework Express.js, para extrair os recursos mínimos de um servidor web. O conjunto de pastas que consiste a organização do projeto foi estruturada da seguinte maneira:
- **config:** contém todas as configurações do Framework necessária para o funcionamento da API
- **Controllers:** contém toda a regra de negócio da aplicação reponsável funcionamento do sistema
- **database:** Onde está toda a gestão de banco de dados e a comunicação com banco de dados MySQL
- **routes:** contém as especificações de todas as rotas do projeto associando-às funções dos controlles

## bibliotecas de terceiros utilizadas
1. body-parser - Utilizada para converter os parâmetros das requisições em objetos json 
2. dotenv  - Utilizada para acessar variáveis de ambiente do sistema
3. nodemon - Utilizada como dependência de desenvolvimento para monitorar o sistema de arquivos e reiniciar o processo Node automaticamente
4. consign - Utilizada para auxiliar o gerenciamento de rotas no express.

## Inicialização
Crie o arquivo de variáveis de ambiente **.env** na raiz do projeto server-app e adicione as configurações do banco de dados MySQL às variáveis exemplificada no arquivo **.env.exemplo.** Acesse o
caminho da raiz do projeto via terminal e execute o comando ***npm install*** para instalar todas as dependência do projeto e em seguida ***npm run serve***

O projeto inicializará um serviço da porta 3000. Importante que já essa porta para que o cliente-app estabeleça as conexões necessárias para o projeto.

# Considerações

Apesar de ter desenvolvido todas as especificações do desafio, caso tivesse mais tempo seria interessante adicionar um mecanismo de autenticação para o usuários junto com a persistência de seus dados, possibilitando o gerenciamento matricular de várias instituições relacionando dados dos alunos com suas instituições.

Apesar da solicitação ser em C# mas ainda estou estudando essa linguagem então não teria condições de aprensertar o mesmo na linguagem solicitada.


