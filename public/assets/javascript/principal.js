//Login
var formLogin = document.getElementById("formLogin");
var botaoLogin = document.getElementById("buttonLogin");

//Busca
var formBusca = document.getElementById("formBusca");
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
    botaoLogin.onclick = function (){
        if(formLogin != null){
            formLogin.onsubmit = function(e){

                var emailLogin = document.getElementById("emailLogin").value;
                var senhaLogin = document.getElementById("senhaLogin").value;
                e.preventDefault();

                logar(emailLogin, senhaLogin).then(function(){
                    //Apos logar, vai para a pagina de perfil
                    window.location.assign("perfil.html");
                });

                document.getElementById("emailLogin").value = '';
                document.getElementById("senhaLogin").value = '';
            };
        }
    }
}
// ==============================================================================================

// Funções para CADASTRAR =======================================================================
function cadastrar(nomeEmpresa, emailEmpresa, senhaEmpresa, facebookEmpresa, telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa){

    //Cadastra o email e senha 
    firebase.auth().createUserWithEmailAndPassword(emailEmpresa, senhaEmpresa).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("ERRO-cadastrar: " + errorMessage);
    }).then(function(){
        //Faz o login com o email e a senha
        logar(emailEmpresa, senhaEmpresa);
        
        //Para cadastrar os outros dados no banco de dados
        atualizarDadosEmpresa(nomeEmpresa, emailEmpresa, facebookEmpresa,
                            telefoneEmpresa, celularEmpresa, mensalidadeEmpresa, sobreEmpresa).then(function(){ 
            //Apos o primeiro cadastro, vai para a segunda parte
            window.location.assign("cadastro_percursos.html");
        });
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

//Quando o usuario clicar no botao PRONTO da primeira parte do cadastro
if(botaoCadastrar != null){
    botaoCadastrar.onclick = function (){
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
            }
        }
    }
}

//Cadastrar PERCURSOS
function cadastrarPercurso(idEmpresa, estadosPartida, cidadesPartida, estadosChegada, cidadesChegada, escolasDestinoMatriz = [,]){

    var update = {};
    var arrayCidades = [];

    //Salva os caminhos para os estados-cidades de partida
    for(var i = 0; i < estadosPartida.length; i++){        
        update['/estados/' + estadosPartida[i] + '/' + cidadesPartida[i] + '/' + idEmpresa] = idEmpresa;
        update['/empresas/' + idEmpresa + '/estados_partida/' + estadosPartida[i] + '/' + cidadesPartida[i]] = cidadesPartida[i];        
    }

    //Aqui salva os caminhos para os estados-cidades-escolas de destino
    var escolas = [];
    for(var i = 0; i < escolasDestinoMatriz.length; i++){

        escolas = [];
        for(var j = 0; j < escolasDestinoMatriz[i].length; j++){
            escolas[j] = escolasDestinoMatriz[i][j];
        }
        update['/empresas/' + idEmpresa + '/estados_chegada/' + estadosChegada[i] + '/' + cidadesChegada[i]] = escolas;
    }
    firebase.database().ref().update(update).then(function(){
        //Apos cadastrar os percursos, será redirecionado para o perfil
        window.location.assign("perfil.html");
    });
}

if(botaoCadastrarPercursoEmpresa != null){
    botaoCadastrarPercursoEmpresa.onclick = function(){

        if(formCadastrarPercursos != null){
                formCadastrarPercursos.onsubmit = function(e){
                e.preventDefault();

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

                var escolasDestinoMatriz = [,];
                
                //Cria uma matriz onde cada linha contem as escolas de cada cidade em ordem
                for(var i = 0; i <= identificador; i++){
                    var temp = document.getElementsByClassName("selectEscolasDestino id_" + i);
                    var arraytemp = [];
                    for(var j = 0; j < temp.length; j++){
                         arraytemp[j] = temp[j].value;                       
                    }    
                    escolasDestinoMatriz[i] = arraytemp;             
                }


                for(var i = 0; i < estadosPartidaE.length; i++){
                    estadosPartida[i] = estadosPartidaE[i].value;
                    cidadesPartida[i] = cidadesPartidaE[i].value;
                }
                for(var i = 0; i < estadosChegadaE.length; i++){
                    estadosChegada[i] = estadosChegadaE[i].value;
                    cidadesChegada[i] = cidadesChegadaE[i].value;
                }
                
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

        var estados = dados.estados_chegada;        
        var i = 0, idChe = 0;
        var primeiraCidade = true;

        //Preeche os inputs e select de chegada com os estados-cidades-escolas
        for(var estado in estados){
            var cidades = estados[estado]; 
                    
            for(var cidade in cidades){               

                if(primeiraCidade){
                    $(".selectEstadosChegada:eq(" + idChe + ")").val(estado).trigger("change");
                    $(".selectCidadesChegada:eq(" +idChe+ ")").val(cidade);
                    var escolas = cidades[cidade];
                    
                    primeiraEscola = true;
                    for(var escola in escolas){
                        //console.log("Estado: " + estado + " - " + cidade + " " + escolas[escola]);
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
                        //console.log("Estado: " + estado + " - " + cidade + " " + escolas[escola]);
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

        primeiraCidade = true;
        
        i = 0;
        estados = dados.estados_partida;

        //Preenche os select de partida com os estados-cidades
        for(var estado in estados){
            var cidades = estados[estado];
            for(var cidade in cidades){
                if(primeiraCidade){
                    $("#selectEstadoPartida" + i).val(estado).trigger("change");
                    $("#selectCidadePartida" + i).val(cidade);
                    primeiraCidade = false;
                }else{
                    $("#buttonAdicionarCidadePartida").trigger("click");
                    $("#selectEstadoPartida" + i).val(estado).trigger("change");
                    $("#selectCidadePartida" + i).val(cidade);
                }
                i++;
            }
        }              
    });
}
//==========================================================================
//== INDEX ================================================================
function buscarEmpresas(estadoPartida, cidadePartida, escola, estadoChegada, cidadeChegada){
    $("#divConteinerResultados").empty();
    
    var idEmpresas = [];
    
    firebase.database().ref('/estados/'+estadoPartida+'/'+cidadePartida).once('value').then(function (snapshot){
        var objID = snapshot.val();

        var i = 0;
        for(var id in objID){
            idEmpresas[i] = id;

            firebase.database().ref('/empresas/' + idEmpresas[i]).once('value').then(function(snapshot){
                var dados = snapshot.val();
                var escolas = dados.estados_chegada[estadoChegada][cidadeChegada];

                if(escolas != 'undefined' && escolas != '' && escolas != null){
                    for(var i = 0; i < escolas.length; i++){
                        if(escolas[i] == escola){
                            var html = 
                                '<article class="articleEmpresa mdl-shadow--4dp">'+
                                    '<h5 class="pNomeEmpresas">'+ dados.nome +'</h5>'+
                                    '<div class="divDadosEmpresas">'+
                                        '<p class="pSobreEmpresa">'+ dados.sobre +'</p>'+
                                        '<p class="pMensalidade">R$ '+ dados.mensalidade +'<span class="pPorMes"> por mês</span></p>'+
                                        '<p class="pTelefoneEmpresa">'+ dados.telefone +'</p><i></i>'+
                                        '<p class="pCelularEmpresa">'+ dados.celular +'</p><i></i>'+
                                        '<p class="pFacebookEmpresa">'+ dados.facebook +'</p><i></i>'+
                                        '<p class="pEmailEmpresa">'+ dados.email +'</p><i></i>'+                      
                                    '</div>'+    
                                '</article>';
                            
                            $("#divConteinerResultados").append(html);
                            break;
                        }
                    } 
                }
            });

            i++;
        }
    });    
}

if(botaoBuscar != null){
    botaoBuscar.onclick = function(){
        if(formBusca != null){
            formBusca.onsubmit = function(e){
                e.preventDefault();

                var estadoPartida = document.getElementById("selectEstadoPartida").value;
                var cidadePartida = document.getElementById("selectCidadePartida").value;
                var nomeEscola = document.getElementById("inputEscola").value;
                var estadoChegada = document.getElementById("selectEstadoChegada").value;
                var cidadeChegada = document.getElementById("selectCidadeChegada").value;

                buscarEmpresas(estadoPartida,cidadePartida,nomeEscola,estadoChegada,cidadeChegada);
            }
        }
    }
}

