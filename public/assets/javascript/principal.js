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

                window.location.assign("perfil.html");
            };
        }
    }
}
// ==============================================================================================

// Funções para CADASTRAR =======================================================================
function cadastrar(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, 
                    telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa){

    firebase.auth().createUserWithEmailAndPassword(emailEmpresa, senhaEmpresa).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("ERRO-cadastrar: " + errorMessage);
    }).then(function (){
        logar(emailEmpresa, senhaEmpresa);

        atualizarDadosEmpresa(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa);
    });    
}

function atualizarDadosEmpresa(nomeEmpresa, emailEmpresa, facebookEmpresa, 
                    telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa){
    
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

                cadastrar(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, 
                            telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa);

                //window.location.href = "perfil.html";
                window.location.assign("cadastro_percursos.html");
            }
        }
    }
}

//Cadastrar PERCURSOS
function cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino){
    alert("como vai?");
    //var empresa = [idEmpresa];

    for(var i = 0; i < estadosPartida.length; i++){
        //Adiciona o id da empresa em cada estado-cidade que ela tem como ponto de partida
        firebase.database().ref('/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]).set(idEmpresa);
    }

    var escolas = escolasDestino;
    for(var i = 0; i < escolasDestino.length; i++){
        //Verificar quais escolas sao de quais cidades (talvez matriz)
        firebase.database().ref('/empresas/' + idEmpresa + '/cidades/'+ cidadesChegada[i] + '/escolas/').set(escolas);
    }
}
if(botaoCadastrarPercursoEmpresa != null){
    botaoCadastrarPercursoEmpresa.onclick = function(){

        if(formCadastrarPercursos != null){
                formCadastrarPercursos.onsubmit = function(e){
                e.preventDefault();
                
                // var escolas = {};
                // firebase.database().ref('/empresas/'+idEmpresa).once('value').then(function(snapshot){
                //     escolas = snapshot.val().escolas;
                //     alert(escolas);
                // });

                var idEmpresa = firebase.auth().currentUser.uid;
                var estadosPartida = {};
                var cidadesPartida = {};
                var estadosChegada = {};
                var cidadesChegada = {};
                var escolasDestino = {};

                var estadosPartidaE = document.getElementsByClassName("selectEstadosPartida");
                var cidadesPartidaE = document.getElementsByClassName("selectCidadesPartida");
                var estadosChegadaE = document.getElementsByClassName("selectEstadosChegada");
                var cidadesChegadaE = document.getElementsByClassName("selectCidadesChegada");
                var escolasDestinoE = document.getElementsByClassName("selectEscolasDestino");

                for(var i = 0; i < estadosPartidaE.length; i++){
                    estadosPartida[i] = estadosPartidaE[i].value;
                    cidadesPartida[i] = cidadesPartidaE[i].value;
                    alert("Partida - " + estadosPartida[i] + " - " + cidadesPartida[i]);
                }
                for(var i = 0; i < estadosPartidaE.length; i++){
                    estadosChegada[i] = estadosChegadaE[i].value;
                    cidadesChegada[i] = cidadesChegadaE[i].value;
                    alert("Chagada - " + estadosChegada[i] + " - " + cidadesChegada[i]);
                }
                for(var i = 0; i < escolasDestinoE.length; i++){
                    escolasDestino[i] = escolasDestinoE[i].value;
                    alert("Escolas - " + escolasDestino[i]);
                }
                
                cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino);
            }
        }  
    }
}


//============================================================================================
