


var ultimoNumero = 0;

$(document).ready(function (){

    // ADD novo Estado-cidade na sessão de partida
    $("#buttonAdicionarCidadePartida").on("click",function (){
        var html = 
        '<div class="divConteinerEstadoCidadePartida">'+
            '<select class="selectEstadosPartida margin-right-4px">'+
                '<option>Estado</option>'+
            '</select>'+
            
            '<select class="selectCidadesPartida">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverConteinerEstadoCidadePartida mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">-</button>'
        '</div>';

        $(this).before(html);      
    });

    // Remover Estado-cidade da sessão de partida
    $("#sectionConteinerPartida").on("click",".buttonRemoverConteinerEstadoCidadePartida", function(){
        $(this).parent().remove();
    });

    // ADD nova escola na sessão de chegada
    
    $("#sectionConteinerChegada").on("click",".buttonAdicionarEscolaDestino", function(){
        ultimoNumero++;
        var html = 
        '<div class="divConteinerEscolaDestino">'+
            '<div class="mdl-textfield mdl-js-textfield divConteinerTextFieldPercursos">'+ /* Grande problema aqui!!! */
                '<input class="mdl-textfield__input" type="text" id="inputEscola'+ ultimoNumero +'" pattern="[a-zA-Z\s]+$">'+
                '<label class="mdl-textfield__label" for="inputEscola'+ ultimoNumero +'">Escola destino...'+ ultimoNumero +'</label>'+
            '</div>'+
            '<button class="buttonRemoverEscolaDestino mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">-</button>'+
        '</div>'

        $(this).before(html);
    });

    // Remover escola
    $("#sectionConteinerChegada").on("click",".buttonRemoverEscolaDestino", function(){
        $(this).parent().remove();
    });

    // ADD novo estado-cidade-escola na sessão de chegada
    $("#buttonAdicionarEstadoCidadeChegada").on("click", function(){
        var html =
        '<div class="divConteinerEstadoCidadeEscolaPartida">'+
            '<select class="selectEstadosChegada margin-right-4px">'+
                '<option>Estado</option>'+
            '</select>'+            
            '<select class="selectCidadesChegada">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverEstadoCidadeChegada mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">-</button>'+
            '<select class="selectEscolasDestino">'+
                '<option>Escola</option>'+
            '</select>'+
            '<button class="buttonAdicionarEscolaDestino mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">+ Escola</button>'+
        '</div>';

        $(this).before(html);
    });

    // Remover estado-cidade-escola
    $("#sectionConteinerChegada").on("click",".buttonRemoverEstadoCidadeChegada", function(){
        $(this).parent().remove();
    });


    // BOTAO ENTRAR para mostra a tela de login
    $(".buttonEntrar").on("click",function(){
        $("#divLogin").fadeToggle();
    });

    $(".pNomeEmpresas").on("click", function(){
        $(this).next().slideToggle();
    });

    // Adicionar cidades e estados nos selects
    
    var cidadespartida = document.getElementById("selectCidadePartida");
    var cidadesChegada = document.getElementById("selectCidadeChegada");
    var selectEstadoPartida = document.getElementById("selectEstadoPartida");
    var selectEstadoChegada = document.getElementById("selectEstadoChegada");
    var estados_cidades = {};
    firebase.database().ref('/estados-consulta').once('value').then(function(snapshot){
        estados_cidades = snapshot.val();

        for(var i = 0; i < estados_cidades.length; i++){
            $("#selectEstadoPartida").append('<option>'+ estados_cidades[i].sigla +'</option>');
            $("#selectEstadoChegada").append('<option>'+ estados_cidades[i].sigla +'</option>');
        }
    });

    $("#selectEstadoPartida").on("change",function(){
        
        for(var i = 0; i < estados_cidades.length; i++){
            if(estados_cidades[i].sigla == $("#selectEstadoPartida :selected").text()){
                $("#selectCidadePartida").empty();
                for(var j = 0; j < estados_cidades[i].cidades.length; j++){                    
                    $("#selectCidadePartida").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');                    
                }
            }
        }

    });

    $("#selectEstadoChegada").on("change",function(){
        
        for(var i = 0; i < estados_cidades.length; i++){
            if(estados_cidades[i].sigla == $("#selectEstadoChegada :selected").text()){
                $("#selectCidadeChegada").empty();
                for(var j = 0; j < estados_cidades[i].cidades.length; j++){                                        
                    $("#selectCidadeChegada").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');
                }
            }
        }

    });

    
});
