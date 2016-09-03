
var ultimoNumero = 0;

$(document).ready(function (){

    // ADD novo Estado-cidade na sessão de partida
    $("#buttonAdicionarCidadePartida").on("click",function (){
        var html = 
        '<div class="divConteinerEstadoCidadePartida">'+
            '<select id="selectEstadosPartida" class="selectEstadoPartida margin-right-4px">'+
                '<option>Estado</option>'+
            '</select>'+
            
            '<select id="selectCidadesPartida" class="selectCidadesPartida">'+
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
                '<input class="mdl-textfield__input mdl-fake-textfield__input" type="text" id="inputEscola'+ ultimoNumero +'" pattern="[a-zA-Z\s]+$" placeholder="Escola destino...">'+
                '<span class="bar"></span>'+
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
            '<select id="selectEstadosChegada" class="selectEstadoChegada margin-right-4px">'+
                '<option>Estado</option>'+
            '</select>'+            
            '<select id="selectCidadesChegada" class="selectCidadesChegada">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverEstadoCidadeChegada mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">-</button>'+
            '<div class="mdl-textfield mdl-js-textfield divConteinerTextFieldPercursos">'+ /* Grande problema aqui!!! */
                '<input class="mdl-textfield__input mdl-fake-textfield__input" type="text" id="inputEscola2'+ ultimoNumero +'" pattern="[a-zA-Z\s]+$" placeholder="Escola destino...">'+
                '<span class="bar"></span>'+
            '</div>'+
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

    //Mostrar os detalhes da empresa nos resultados
    $(".pNomeEmpresas").on("click", function(){
        $(this).next().slideToggle();
    });      
});
