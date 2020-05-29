require('dotenv').config({
    path: "../.env"
});
var SeniorApi = require('../built/index').SeniorApi;
var FilterBuilder = require('../built/index').FilterBuilder;

var username = process.env.SENIOR_USERNAME;
var password = process.env.PASS;

var api = new SeniorApi();

// Efetuando login
api.authentication.login(username, password).then(function (json) {
    var jsonToken = JSON.parse(json.body.jsonToken);
    api.accessToken = jsonToken.access_token;
   
    var entity = api.getEntity('usuarios', 'userManager', 'Grupo');
    
    entity.post({
        nome: 'grupotestesdk'
    }).then(post => {
        const id = post.body.idGrupo.replace(/^\s+|\s+$/g,"");
        entity.get().then(sucess => {}, error => {});
        entity.get(id).then(sucess => {}, error => {});
        entity.get(new FilterBuilder().field('nome').equals('grupotestesdk').build()).then(sucess => {}, error => {});
        
        entity.put(id, {
            idGrupo: id,
            nome: 'grupotestesdk2'
        }).then(sucess => {}, error => {});

        entity.patch(id, {
            idGrupo: id,
            nome: 'grupotestesdk3'
        }).then(sucess => {}, error => {});

        entity.delete(id).then(sucess => {}, error => {});
    }, error => {});

    if (api.accessToken) {
        api.authentication.logout().catch(function (error) {
            console.error("Erro na tentativa de efetuar logout: ", error);
        });
   }
}).catch(function (error) {
    console.error("Erro na tentativa de efetuar login: ", error);
});