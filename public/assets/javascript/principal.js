//Login
var formLogin = document.getElementById("formLogin");
var botaoLogin = document.getElementById("buttonLogin");

//Busca
var formBusca = document.getElementById("formBusca");
var estadoPartida = document.getElementById("selectEstadoPartida");
var cidadePartida = document.getElementById("selectCidadePartida");
var nomeEscola = document.getElementById("inputEscola");
var estadoChegada = document.getElementById("selectCidadeChegada");
var cidadeChegada = document.getElementById("selectCidadeChegada");
var botaoBuscar = document.getElementById("buttonBuscar");

// //cadastrar
var formCadastrar = document.getElementById("formCadastrar");
var botaoCadastrar = document.getElementById("buttonCadastroEmpresa");

//Cadastrar PERCURSOS
var formCadastrarPercursos = document.getElementById("formCadastrarPercursos");
var botaoCadastrarPercursoEmpresa = document.getElementById("buttonCadastroPercursosEmpresa");

// Funções para LOGAR ===========================================================================
function logar(emailLogin, senhaLogin){
    firebase.auth().signInWithEmailAndPassword(emailLogin, senhaLogin).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("ERRO-login: " + errorMessage);
    });

    $("#divLogin").fadeOut(); 
}

if(botaoLogin != null){
    botaoLogin.onclick = function (event){
        //window.location.assign("perfil.html");
        //event.preventDefault();
        if(formLogin != null){
            formLogin.onsubmit = function(e){

                var emailLogin = document.getElementById("emailLogin").value;
                var senhaLogin = document.getElementById("senhaLogin").value;
                e.preventDefault();

                logar(emailLogin, senhaLogin);

                document.getElementById("emailLogin").value = '';
                document.getElementById("senhaLogin").value = '';

               // window.location.assign("perfil.html");
            };
        }
    }
}
// ==============================================================================================

// Funções para CADASTRAR =======================================================================
function cadastrar(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa){

    firebase.auth().createUserWithEmailAndPassword(emailEmpresa, senhaEmpresa).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("ERRO-cadastrar: " + errorMessage);
    }).then(function (){
        logar(emailEmpresa, senhaEmpresa);

        atualizarDadosEmpresa(nomeEmpresa, emailEmpresa, facebookEmpresa,telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa);
    });    
}

function atualizarDadosEmpresa(nomeEmpresa, emailEmpresa, facebookEmpresa,telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa){
    
    var idEmpresa = firebase.auth().currentUser.uid;

    var dadosEmpresa = {      
        nome : nomeEmpresa, 
        email : emailEmpresa,
        facebook : facebookEmpresa,
        telefone : telefoneEmpresa,
        celular : celularEmpresa,
        mensalidade : mensalidadeEmpresa,
        sobre : sobreEmpresa    
    };

    return firebase.database().ref('/empresas/' + idEmpresa).update(dadosEmpresa);
}

if(botaoCadastrar != null){
    botaoCadastrar.onclick = function (event){
        //window.location.assign("cadastro_percursos.html");
        //event.preventDefault();
        if(formCadastrar != null){
            formCadastrar.onsubmit = function(e){
                
                //cadastrar
                var nomeEmpresa = document.getElementById("inputNomeEmpresa").value;
                var emailEmpresa = document.getElementById("inputEmailEmpresa").value;
                var senhaEmpresa = document.getElementById("inputSenhaEmpresa").value;
                var facebookEmpresa = document.getElementById("inputFacebookEmpresa").value;
                var telefoneEmpresa = document.getElementById("inputTelefoneEmpresa").value;
                var celularEmpresa = document.getElementById("inputCelularEmpresa").value;
                var mensalidadeEmpresa = document.getElementById("inputMensalidadeEmpresa").value;
                var sobreEmpresa = document.getElementById("textareaSobreEmpresa").value;

                e.preventDefault();

                cadastrar(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa);

                //window.location.href = "perfil.html";
                //window.location.assign("cadastro_percursos.html");
            }
        }
    }
}

//Cadastrar PERCURSOS
function cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestinoMatriz = [,]){

    // var partida = 
    // [
    //     {
    //         sigla:"SP",
    //         cidades:
    //         [
    //             {
    //                 nome: "cidade 1",
    //                 empresas:
    //                 [
    //                     "empresa 1",
    //                     "empresa 2"
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         sigla:"SP",
    //         cidades:
    //         [
    //             {
    //                 nome: "cidade 1",
    //                 empresas:
    //                 [
    //                     "empresa 1",
    //                     "empresa 2"
    //                 ]
    //             }
    //         ]
    //     }
    // ];
    var update = {};
    for(var i = 0; i < estadosPartida.length; i++){        
        update['/estados/' + estadosPartida[i] + '/' + cidadesPartida[i] + '/' + idEmpresa] = idEmpresa;        
    }
    firebase.database().ref().update(update);
     
    update = {};
    var escolas = [];
    for(var i = 0; i < escolasDestinoMatriz.length; i++){

        escolas = [];
        for(var j = 0; j < escolasDestinoMatriz[i].length; j++){
            escolas[j] = escolasDestinoMatriz[i][j];
        }
        update['/empresas/' + idEmpresa + '/estados/' + estadosChegada[i] + '/' + cidadesChegada[i]] = escolas;
    }
    firebase.database().ref().update(update);
}

if(botaoCadastrarPercursoEmpresa != null){
    botaoCadastrarPercursoEmpresa.onclick = function(){

        if(formCadastrarPercursos != null){
                formCadastrarPercursos.onsubmit = function(e){
                e.preventDefault();
                
                // var cidadesJaCadastradas = [];  
                // var escolasJaCadastradas = [];
                var estadosPartida = [];
                var cidadesPartida = [];
                var estadosChegada = [];
                var cidadesChegada = [];
                var escolasDestino = [];

                var idEmpresa = firebase.auth().currentUser.uid;
                var estadosPartidaE = document.getElementsByClassName("selectEstadosPartida");
                var cidadesPartidaE = document.getElementsByClassName("selectCidadesPartida");
                var estadosChegadaE = document.getElementsByClassName("selectEstadosChegada");
                var cidadesChegadaE = document.getElementsByClassName("selectCidadesChegada");
                //var escolasDestinoE = document.getElementsByClassName("selectEscolasDestino");

                var escolasDestinoMatriz = [,];
                
                for(var i = 0; i <= identificador; i++){
                    var temp = document.getElementsByClassName("selectEscolasDestino id_" + i);
                    var arraytemp = [];
                    for(var j = 0; j < temp.length; j++){
                         arraytemp[j] = temp[j].value;     
                        //console.log('Escola['+i+','+j+'] : '+ escolasDestinoMatriz[i,j]);                   
                    }    
                    escolasDestinoMatriz[i] = arraytemp;             
                }

                // for(var i = 0; i <= identificador; i++){
                //     var temp = document.getElementsByClassName("selectEscolasDestino id_" + i);
                //     for(var j = 0; j < temp.length; j++){     
                //         console.log('Escola['+i+','+j+'] : '+ escolasDestinoMatriz[i][j]);                   
                //     }                    
                // }

                /*firebase.database().ref('/empresas/'+idEmpresa+'/cidades').once('value').then(function(snapshot){
                    var cidadesToString = {};
                    if(snapshot.val() != null){
                        cidadesToString = snapshot.val();

                        var i = 0;
                        for(cidade in cidadesToString){
                            cidadesJaCadastradas[i] = (cidade);
                            i++;
                        }
                        
                        i = 0;
                        for(i = 0; i < cidadesJaCadastradas.length; i++){                            
                            //alert();
                            firebase.database().ref('/empresas/'+idEmpresa+'/cidades/'+cidadesJaCadastradas[i]+'/escolas').once('value').then(function(snapshot){
                                escolasJaCadastradas[i] = snapshot.val();
                                //console.log(escolasJaCadastradas[i]);                                                               
                            });
                        }                        
                    }
                    
                });*/

                for(var i = 0; i < estadosPartidaE.length; i++){
                    estadosPartida[i] = estadosPartidaE[i].value;
                    cidadesPartida[i] = cidadesPartidaE[i].value;
                    //alert("Partida - " + estadosPartida[i] + " - " + cidadesPartida[i] + " - " + estadosPartida.length);
                }
                for(var i = 0; i < estadosChegadaE.length; i++){
                    estadosChegada[i] = estadosChegadaE[i].value;
                    cidadesChegada[i] = cidadesChegadaE[i].value;
                    //alert("Chagada - " + estadosChegada[i] + " - " + cidadesChegada[i] + " - " + estadosChegada.length);
                }
                /*for(var i = 0; i < escolasDestinoE.length; i++){
                    escolasDestino[i] = escolasDestinoE[i].value;
                    //alert("Escolas - " + escolasDestino[i] + " - " + escolasDestino.length);
                }*/

                
                cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestinoMatriz);
            }
        }  
    }
}
//==================================================================================
// PERFIL ==========================================================================
function carregarDadosEmpresa(){
    var nomeEmpresa = document.getElementById("inputNomeEmpresa");
    var emailEmpresa = document.getElementById("inputEmailEmpresa");
    var facebookEmpresa = document.getElementById("inputFacebookEmpresa");
    var telefoneEmpresa = document.getElementById("inputTelefoneEmpresa");
    var celularEmpresa = document.getElementById("inputCelularEmpresa");
    var mensalidadeEmpresa = document.getElementById("inputMensalidadeEmpresa");
    var sobreEmpresa = document.getElementById("textareaSobreEmpresa");
    var idEmpresa = firebase.auth().currentUser.uid;

    firebase.database().ref('/empresas/' + idEmpresa).once('value').then(function(snapshot){
        var dados = snapshot.val();

        nomeEmpresa.value = dados.nome;
        emailEmpresa.value = dados.email;
        facebookEmpresa.value = dados.facebook;
        telefoneEmpresa.value = dados.telefone;
        celularEmpresa.value = dados.celular;
        mensalidadeEmpresa.value = dados.mensalidade;
        sobreEmpresa.value = dados.sobre;

        var estados = dados.estados;        
        var i = 0, idChe = 0;
        var primeiraCidade = true;
        for(var estado in estados){
            var cidades = estados[estado]; 
                    
            for(var cidade in cidades){               

                if(primeiraCidade){
                    $(".selectEstadosChegada:eq(" + idChe + ")").val(estado).trigger("change");
                    $(".selectCidadesChegada:eq(" +idChe+ ")").val(cidade);
                    var escolas = cidades[cidade];
                    
                    primeiraEscola = true;
                    for(var escola in escolas){
                        console.log("Estado: " + estado + " - " + cidade + " " + escolas[escola]);
                        if(primeiraEscola){
                            $(".selectEscolasDestino:eq(" + i + ")").val(escolas[escola]); 
                            primeiraEscola = false;
                        }else{
                            $(".buttonAdicionarEscolaDestino:eq(" +idChe + ")").trigger("click");
                            $(".selectEscolasDestino:eq(" +i + ")").val(escolas[escola]);                        
                        }
                        i++;
                    }
                    primeiraCidade = false;
                }else{
                    $("#buttonAdicionarEstadoCidadeChegada").trigger("click");
                    $(".selectEstadosChegada:eq(" + idChe + ")").val(estado).trigger("change");
                    $(".selectCidadesChegada:eq(" + idChe + ")").val(cidade);
                    var escolas = cidades[cidade];

                    primeiraEscola = true;
                    for(var escola in escolas){
                        console.log("Estado: " + estado + " - " + cidade + " " + escolas[escola]);
                        if(primeiraEscola){
                            $(".selectEscolasDestino:eq(" +i + ")").val(escolas[escola]); 
                            primeiraEscola = false;
                        }else{
                            $(".buttonAdicionarEscolaDestino:eq(" +idChe + ")").trigger("click");
                            $(".selectEscolasDestino:eq(" +i + ")").val(escolas[escola]);                        
                        }
                        i++;
                    }
                }
                idChe++;
            }            
        }              
    });
}
