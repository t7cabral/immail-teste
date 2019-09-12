# Teste ImMail - Vaga Desenvolvedor Web

A descrição das tarefas a serem realizadas estão no endereço https://gist.github.com/rmsouza/2efecb67b803da5e9fa67de2cc1602e9 e também no arquivo ***task.md*** localizado nesse projeto.



# Estrutura do projeto

| Pasta      | Descrição                                                    |
| ---------- | ------------------------------------------------------------ |
| 1_parse    | Realiza a leitura do arquivo ***game.log*** e salva no MongoDB. |
| 2_api      | API Restfull rodando na porta 2000 para servir os dados do MongoDB para o Frontend. |
| 3_frontend | Frontend em ReactJS, consumindo API (*projeto 2_api*).       |



# Banco de dados

Foi utilizado o serviço de Cloud do site https://www.mongodb.com.



# Executando o projeto



### Preparação do ambiente

É necessário instalar ***NodeJS*** e o gerenciador de pacotes Javascript ***Yarn***.

Link de instalação do NodeJS https://nodejs.org/en/download/package-manager/

Link de instalação do Yarn https://yarnpkg.com/lang/pt-br/docs/install



### Execução

Na raiz de cada pasta de projeto (***1_parse***, ***2_api*** e ***3_frontend***), execute o comando `yarn install` para baixar  as dependência.

Execute o comando `yarn start` na raiz de cada projeto para iniciar.

Vídeo do APP em funcionamento https://youtu.be/xMbUgCTIb3c



# Quesitos não cumpridos

Não foram realizados suite de testes como solicitado no *Quesito 2* devido minha ignorância no assunto, entretanto, foram realizados testes "metodologia própria" em cada etapa do desenvolvimento.



Obrigado.

Att, Thiago Cabral