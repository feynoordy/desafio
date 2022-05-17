**Jivochat Scraper**
 
Este projeto acessa o painel do JivoChat e extrai informações 
do relatório geral e o armazena em baco de dados de forma autônoma.
 
_Para executar esse projeto você tem que:
_
 
1. Configurar o projeto:
Após baixar o projeto, crie um banco de dados mySql. Feito isso abra o arquivo .env e set o nome do 
banco que você criou em DB_DATABASE e suas demais configurações de acesso. Configure as credenciais 
de email e senha do painel JivoChat.
 
Caso queira acompanhar as interações com o painel do JivoChate manhanha a configuração APP_ENV=local, caso contrário
altere para outro valor de sua preferência como "prod" por exemplo. 
 
**Se optar por manter APP_ENV = local, configure o PATH_CHROMIUM_DOWLOAND com o endereço da sua pasta de download 
padrão do seu sistema, apara que a aplicação possa identificar o local dos arquivos temporários gerado a cada consulta
de um relatório.
 
2.  Instalar as dependências
Abra o termina na raiz do projeto e execute o comando "npm install"
 
3. Inicie o servidor
Abra o termina na raiz do projeto e execute o comando "nodemon index.js" 
 
**_ Métodos:_**
 
_/getDailyGeneralReports:_
Este métodos acessa um conjunto de relatórios entre o período inicial e final determinado, buscando pelo
número de chamadas rejeitadas de cada operador em cada um dos relatório do intervalo.
 
Em um navegador acesse a rota /getDailyGeneralReports via método post passando por parâmetros as variáveis
start_date e end_date em formato json indicando um intervalo. Ao omitir o end_data, por definição será
considerado a data atual com fim do intervalo.
 
Exemplos:
 
1º Passando apenas o "start_date"
{
    "start_date": "01/05/2022"
}
Salva o número de chamadas rejeitadas dos relatórios gerais diário do dia 01/05/2022 até o dia atual
 
2º Passando o "start_date" e "end_date"
{
    "start_date": "01/05/2022"
    "end_date" : "05/05/2022"
}
Salva o número de chamadas rejeitadas dos relatórios gerais diário do dia 01/05/2022 até o dia 05/05/2022
 
3º Omitindo ambos os parâmetros
{
 
}
Salva o número de chamadas rejeitadas do relatório geral do dia atual.
 

