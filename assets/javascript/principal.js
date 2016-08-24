//Login
var formLogin = document.getElementById("formLogin");
// var emailLogin = document.getElementById("emailLogin");
// var senhaLogin = document.getElementById("senhaLogin");
var botaoLogin = document.getElementById("buttonLogin");

//Busca
var formBusca = document.getElementById("formBusca");
var estadoPartida = document.getElementById("selectEstadoPartida");
var cidadePartida = document.getElementById("selectCidadePartida");
var nomeEscola = document.getElementById("inputEscola");
var estadoChegada = document.getElementById("selectCidadeChegada");
var cidadeChegada = document.getElementById("selectCidadeChegada");

// //cadastrar
var formCadastrar = document.getElementById("formCadastrar");
// var nomeEmpresa = document.getElementById("inputNomeEmpresa");
// var emailEmpresa = document.getElementById("inputEmailEmpresa");
// var senhaEmpresa = document.getElementById("inputSenhaEmpresa");
// var facebookEmpresa = document.getElementById("inputFacebookEmpresa");
// var telefoneEmpresa = document.getElementById("inputTelefoneEmpresa");
// var celularEmpresa = document.getElementById("inputCelularEmpresa");
// var mensalidadeEmpresa = document.getElementById("inputMensalidadeEmpresa");
// var sobreEmpresa = document.getElementById("textareaSobreEmpresa");
//Cadastrar PERCURSOS
var formCadastrarPercursos = document.getElementById("formCadastrarPercursos");
var estadosPartida = document.getElementsByClassName("selectEstadosPartida");
var cidadesPartida = document.getElementsByClassName("selectCidadesPartida");
var estadosChegada = document.getElementsByClassName("selectEstadosChegada");
var cidadesChegada = document.getElementsByClassName("selectCidadesChegada");
var escolasDestino = document.getElementsByClassName("selectEscolasDestino");

// Funções para LOGAR ===========================================================================
function logar(emailLogin, senhaLogin){
    firebase.auth().signInWithEmailAndPassword(emailLogin, senhaLogin).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("ERRO-login: " + errorMessage);
    });
}

formLogin.onsubmit = function(e){

    var emailLogin = document.getElementById("emailLogin").value;
    var senhaLogin = document.getElementById("senhaLogin").value;
    e.preventDefault();

    logar(emailLogin, senhaLogin);
};
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

function atualizarDadosEmpresa(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, 
                    telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa){
    
    var idEmpresa = firebase.auth().currentUser.uid;

    var dadosEmpresa = {        
        nome : nomeEmpresa,
        email : emailEmpresa,
        senha : senhaEmpresa,
        facebook : facebookEmpresa,
        telefone : telefoneEmpresa,
        celular : celularEmpresa,
        mensalidade : mensalidadeEmpresa,
        sobre : sobreEmpresa    
    };
    return firebase.database().ref('/empresas/' + idEmpresa).update(dadosEmpresa);
}

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
    }
}

//Cadastrar PERCURSOS
function cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino){

    var empresa = [idEmpresa];
    // Falta recuperar os dados ja existente no caminho para quando usar o set nao apaga-los, mas regrava-los
    for(var i = 0; i < estadosPartida.length; i++){
        //Adiciona o id da empresa em cada estado-cidade que ela tem como ponto de partida
        firebase.database().ref('/estados/' + estadosPartida[i] + '/cidades/' + cidadesPartida[i]).set(empresa);
    }

    var escolas = escolasDestino;
    for(var i = 0; i < escolasDestino.length; i++){
        //Verificar quais escolas sao de quais cidades (talvez matriz)
        firebase.database().ref('/empresas/' + idEmpresa + '/cidades/'+ cidadesChegada[i] + '/escolas/').set(escolas);
    }
}

if(formCadastrarPercursos != null){
    formCadastrarPercursos.onsubmit = function(e){

        var idEmpresa = firebase.auth().currentUser.uid;
        var estadosPartida = ["São Paulo", "São Paulo"];
        var cidadesPartida = ["Artur Nogueira", "Cosmópolis"];
        var estadosChegada = ["São Paulo", "São Paulo"];
        var cidadesChegada = ["Limeira", "Paulínia"];
        var escolasDestino = ["Procotil", "Cotil", "Trajano"];

        e.preventDefault();

        cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino);
    }
}

//============================================================================================