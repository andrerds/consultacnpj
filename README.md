# IONIC - CONSULTA CNPJ by André Rds

[![I|IONIC](https://cdn.worldvectorlogo.com/logos/ionic.svg)](https://ionicframework.com/)
 
Consulta de cnpj com ionic capacitor.

  - Consulta Cnpj by ReceitaWs
  - Build Capacitor
  - Code Simple

# New Features!

  - Versão 1.0 - Consulta Simples Cnpj
  - Não é necessáro Captch 

### Instalação

Antes de Inicar adicione essse codigo ao seu servidor - Codigo para fazer a consulta.
crie um arquico com seguinte nome consultacnpj.php
```sh
<?php
//by Andre rds versão 1.0 Siga @andrerds1 ( Instagranm /Twitter ) 
header('Access-Control-Allow-Origin: *'); 
//Garantir que seja lido sem problemas
header("Content-Type: text/plain");

//Capturar CNPJ
$cnpj = $_REQUEST["cnpj"];

//Criando Comunicação cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.receitaws.com.br/v1/cnpj/".$cnpj);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$retorno = curl_exec($ch);
curl_close($ch);

$retorno = json_decode($retorno); //Ajuda a ser lido mais rapidamente
echo json_encode($retorno, JSON_PRETTY_PRINT);
```
#### Instale as dependências.

```sh
$ cd consultacnpj
$ npm install
$ 
```
Abra o projeto no arquivo environment.ts
Mude a url urlConsult: 'https://seudomio.com/consultacnpj.php?cnpj=',
```sh
export const environment = {
  production: false,
  urlConsult: 'https://seudominio.com/consultacnpj.php?cnpj=',
};
```
Agora podemos dar sequência...
##### Obs: Caso as libs capacitor não instalar, entre no projeto e execute os comandos abaixo

```sh
$ npm install @capacitor/core @capacitor/cli
```
### Build Capacitor...
```sh
$ ionic build
$ npx cap add android

$ npx cap add ios
Ou
$ npx cap add electron
$ npx cap open electron
```

Abrir Server Rode o seguinte comando.
```sh
ionic serve
```
Abra seu navegador
```sh
http://localhost:8100
```
----
### Funcionando.

https://consultacnpj.surge.sh/

----
### Conceitos finais

 - Brinque , se divirta
 - Colabore

License
----

MIT

