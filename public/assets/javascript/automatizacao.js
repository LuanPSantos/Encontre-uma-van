
var indexIdPartida = 0;
var indexIdChegada = 0;
var indexIdEscola = 0;
var identificador = 0;

$(document).ready(function (){

    // ADD novo Estado-cidade na sessão de partida
    $("#buttonAdicionarCidadePartida").on("click",function (){
        indexIdPartida++;

        var html = 
        '<div class="divConteinerEstadoCidadePartida">'+
            '<select id="selectEstadoPartida'+ indexIdPartida +'" class="selectEstadosPartida margin-right-4px">'+
                '<option>Estado</option>'+
            '</select>'+
            
            '<select id="selectCidadePartida'+ indexIdPartida +'" class="selectCidadesPartida">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverConteinerEstadoCidadePartida mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect background-maire">-</button>'
        '</div>';
        
        $(this).before(html); 

         
        for(var i = 0; i < estados_cidades.length; i++){            
            $(this).prev().children(".selectEstadosPartida").append('<option>'+ estados_cidades[i].sigla +'</option>');
        }     
    });

    // Remover Estado-cidade da sessão de partida
    $("#sectionConteinerPartida").on("click",".buttonRemoverConteinerEstadoCidadePartida", function(){
        $(this).parent().remove();
    });

    // ADD nova escola na sessão de chegada    
    $("#sectionConteinerChegada").on("click",".buttonAdicionarEscolaDestino", function(){
        indexIdEscola++;

        var html = 
        '<div class="divConteinerEscolaDestino">'+
            '<div class="mdl-textfield mdl-js-textfield divConteinerTextFieldPercursos">'+ 
                '<input class="mdl-textfield__input mdl-fake-textfield__input selectEscolasDestino id_'+ identificador +'" type="text" id="inputEscola'+ indexIdEscola +'" placeholder="Escola destino...">'+
                '<span class="bar"></span>'+
            '</div>'+
            '<button class="buttonRemoverEscolaDestino mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect background-maire">-</button>'+
        '</div>'

        $(this).before(html);
    });

    // Remover escola
    $("#sectionConteinerChegada").on("click",".buttonRemoverEscolaDestino", function(){
        $(this).parent().remove();
    });

    // ADD novo estado-cidade-escola na sessão de chegada
    $("#buttonAdicionarEstadoCidadeChegada").on("click", function(){
        indexIdChegada++;
        identificador++;
        var html =
        '<div class="divConteinerEstadoCidadeEscolaChegada">'+
            '<select id="selectEstadoChegada'+ indexIdChegada +'" class="selectEstadosChegada id_'+ identificador +' margin-right-4px">'+
                '<option>Estado</option>'+
            '</select>'+            
            '<select id="selectCidadeChegada'+ indexIdChegada +'" class="selectCidadesChegada id_'+ identificador +'">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverEstadoCidadeChegada mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect background-maire">-</button>'+
            '<div class="mdl-textfield mdl-js-textfield divConteinerTextFieldPercursos">'+ 
                '<input class="mdl-textfield__input mdl-fake-textfield__input selectEscolasDestino id_'+ identificador +'" type="text" id="inputEscola'+ indexIdChegada +'" placeholder="Escola destino...">'+
                '<span class="bar"></span>'+
            '</div>'+
            '<button class="buttonAdicionarEscolaDestino id_'+ indexIdChegada +' mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect background-maire">+ Escola</button>'+
        '</div>';

        $(this).before(html);

        for(var i = 0; i < estados_cidades.length; i++){            
            $(this).prev().children(".selectEstadosChegada").append('<option>'+ estados_cidades[i].sigla +'</option>');
        } 
    });

    // Remover estado-cidade-escola
    $("#sectionConteinerChegada").on("click",".buttonRemoverEstadoCidadeChegada", function(){
        $(this).parent().remove();
    });


    // BOTAO ENTRAR para mostra a tela de login
    $(".buttonEntrar").on("click",function(){
        $("#divLogin").fadeToggle();
    });

    //Mostrar os detalhes da empresa nos resultados
    $("#sectionResultado").on("click",".pNomeEmpresas", function(){
        $(this).next().slideToggle();
    });      
});
