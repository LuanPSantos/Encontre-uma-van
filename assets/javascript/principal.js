//Login
var formLogin = document.getElementById("formLogin");
var emailLogin = document.getElementById("emailLogin");
var senhaLogin = document.getElementById("senhaLogin");
var botaoLogin = document.getElementById("buttonLogin");

//Busca
var formBusca = document.getElementById("formBusca");
var estadoPartida = document.getElementById("selectEstadoPartida");
var cidadePartida = document.getElementById("selectCidadePartida");
var nomeEscola = document.getElementById("inputEscola");
var estadoChegada = document.getElementById("selectCidadeChegada");
var cidadeChegada = document.getElementById("selectCidadeChegada");

//cadastrar
var formCadastrar = document.getElementById("formCadastrar");
var nomeEmpresa = document.getElementById("inputNomeEmpresa");
var emailEmpresa = document.getElementById("inputEmailEmpresa");
var senhaEmpresa = document.getElementById("inputSenhaEmpresa");
var facebookEmpresa = document.getElementById("inputFacebookEmpresa");
var telefoneEmpresa = document.getElementById("inputTelefoneEmpresa");
var celularEmpresa = document.getElementById("inputCelularEmpresa");
var mensalidadeEmpresa = document.getElementById("inputMensalidadeEmpresa");
var sobreEmpresa = document.getElementById("inputSobreEmpresa");
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
    });
}

formLogin.onsubmit = function(e){
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
    });

    logar(emailLogin, senhaLogin);

    var idEmpresa = firebase.auth().currentUser.uid;
    //var novaChave = firebase.database().ref('/empresas').push().key;

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

    var atualizacoes = {};

    atualizacoes['/empresas/' + idEmpresa] = dadosEmpresa;
    return firebase.database().ref().update(dadosEmpresa);
}

formCadastrar.onsubmit = function(e){
    e.preventDefault();

    cadastrar(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, 
                telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa);
}

//Cadastrar PERCURSOS
function cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestino){
    var idEmpresa = firebase.auth().currentUser.uid;

    for(var i = 0; i < estadosPartida.length; i++){
        for(var j = 0; i < cidadesPartida.length; j++){
            
            //SP/Artur Nogueira['empresa 1'] -- com esse codigo eu adiciono essa empresa na cidade? acho que nao.
            firebase.database().ref('/' + estadosPartida[i] + '/' + cidadesPartida[j]).update(uid);            
        }
    }

    for(var i = 0; i < escolasDestino.length; i++){
        //Implementar adição das cidades com suas escolas destinos para cada empresa
    }
}

//============================================================================================