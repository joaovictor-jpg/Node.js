# Node.js com serverless framework
Este projeto foi desenvolvido para consolidar meus conhecimentos em AWS Lambda e Serverless, utilizando todo o aprendizado adquirido no curso da Alura.

## Executando localmente

O projeto foi desenvolvido da maneira mais simples possível para facilitar sua utilização. Nenhum framework ou biblioteca foi empregado no front-end.
Todo o funcionamento do projeto se baseia no arquivo serverless.yaml e no index.js, que é o arquivo principal. Para executá-lo, você precisará ter uma conta na:
- AWS
- Serverless
- Configuração do Serverless localmente
Para as configurações:

```bash
npm i -g serverless
serverless --console
sls login
sls config credentials --provider aws
sls --org=<sua-org-no-serverless>
AWS - Node.js - HTTP API
```

Para executar seu projeto localmente depois das configurações executar o comando:

```bash
sls offline
```

Isso vai garantir que você não precise ficar reiniciando o servidor a cada alteração que fizer. Todo o front-end da aplicação está na pasta `interface`, toda a API da aplicação está dentro do arquivo `serverless`.

Depois de executar o projeto, você pode acessar a aplicação
