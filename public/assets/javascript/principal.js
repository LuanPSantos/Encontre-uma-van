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
var estadosPartida = document.getElementsByClassName("selectEstadosPartida");
var cidadesPartida = document.getElementsByClassName("selectCidadesPartida");
var estadosChegada = document.getElementsByClassName("selectEstadosChegada");
var cidadesChegada = document.getElementsByClassName("selectCidadesChegada");
var escolasDestino = document.getElementsByClassName("selectEscolasDestino");
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
function cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino){
    
    //var empresa = [idEmpresa];
    var empresasID = [];
    var updates = {};
    for(var i = 0; i < estadosPartida.length; i++){
        
        firebase.database().ref('/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]).once('value').then(function(snapshot){
            var temp;
            if( snapshot.val() != null){
                for(var y = 0; y < snapshot.val().length; y++){
                    empresasID[/*i,*/y] = snapshot.val()[y];
                    temp = y;
                }
                empresasID[/*i,*/++temp] = idEmpresa; 
            }else{
                empresasID[0] = idEmpresa;
            }

            console.log(empresasID[0]);                       
        });

        console.log('/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]);
        firebase.database().ref('/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]).set(empresasID);  

        //console.log('/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]);
        //updates['/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]] = empresasID;  
            
    }   
    //Adiciona o id da empresa em cada estado-cidade que ela tem como ponto de partida
    // firebase.database().ref().update({updates});

    // var escolas = {};
    // escolas = escolasDestino;
    // for(var i = 0; i < cidadesChegada.length; i++){
    //     //Verificar quais escolas sao de quais cidades (talvez matriz)
    //     firebase.database().ref('/empresas/' + idEmpresa + '/cidades/'+ cidadesChegada[i] + '/escolas/').set(escolas);
    // }
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
                var escolasDestinoE = document.getElementsByClassName("selectEscolasDestino");

                // firebase.database().ref('/empresas/'+idEmpresa+'/cidades').once('value').then(function(snapshot){
                //     var cidadesToString = {};
                //     if(snapshot.val() != null){
                //         cidadesToString = snapshot.val();

                //         var i = 0;
                //         for(cidade in cidadesToString){
                //             cidadesJaCadastradas[i] = (cidade);
                //             i++;
                //         }
                        
                //         i = 0;
                //         for(i = 0; i < cidadesJaCadastradas.length; i++){                            
                //             //alert();
                //             firebase.database().ref('/empresas/'+idEmpresa+'/cidades/'+cidadesJaCadastradas[i]+'/escolas').once('value').then(function(snapshot){
                //                 escolasJaCadastradas[i] = snapshot.val();
                //                 //console.log(escolasJaCadastradas[i]);                                                               
                //             });
                //         }                        
                //     }
                    
                // });

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
                for(var i = 0; i < escolasDestinoE.length; i++){
                    escolasDestino[i] = escolasDestinoE[i].value;
                    //alert("Escolas - " + escolasDestino[i] + " - " + escolasDestino.length);
                }

                // if(escolas != null && escolas != ""){
                //     for(var i = 0; i < escolas.length; i++){
                //         escolasDestino[escolasDestino.length + i] = escolas[i];
                //     }
                    
                //     //alert("E O Q: " + escolasDestino[0] + " - " + escolasDestino[escolasDestino.length - 1]);
                // }
                
                cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino);
            }
        }  
    }
}


//============================================================================================
