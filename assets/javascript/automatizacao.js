$(document).ready(function (){

    // ADD novo Estado-cidade na sessão de partida
    $("#buttonAdicionarCidadePartida").on("click",function (){
        var html = 
        '<div class="divConteinerEstadoCidadePartida">'+
            '<select class="selectEstadosPartida">'+
                '<option>Estado</option>'+
            '</select>'+
            
            '<select class="selectCidadesPartida">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverConteinerEstadoCidadePartida">-</button>'
        '</div>';

        $(this).before(html);      
    });

    // Remover Estado-cidade da sessão de partida
    $("#sectionConteinerChegada").on("click",".buttonRemoverConteinerEstadoCidadePartida", function(){
        $(this).parent().remove();
    });

    // ADD nova escola na sessão de chegada
    $("#sectionConteinerPartida").on("click",".buttonAdicionarEscolaDestino", function(){
        var html = 
        '<div class="divConteinerEscolaDestino">'+
            '<select class="selectEscolasDestino">'+
                '<option>Escola</option>'+
            '</select>'+
            '<button class="buttonRemoverEscolaDestino">-</button>'+
        '</div>'

        $(this).before(html);
    });

    // Remover escola
    $("#sectionConteinerPartida").on("click",".buttonRemoverEscolaDestino", function(){
        $(this).parent().remove();
    });

    // ADD novo estado-cidade-escola na sessão de chegada
    $("#buttonAdicionarEstadoCidadeChegada").on("click", function(){
        var html =
        '<div class="divConteinerEstadoCidadeEscolaPartida">'+
            '<select class="selectEstadosChegada">'+
                '<option>Estado</option>'+
            '</select>'+            
            '<select class="selectCidadesChegada">'+
                '<option>Cidade</option>'+
            '</select>'+
            '<button class="buttonRemoverEstadoCidadeChegada">- Cidade</button>'+
            '<select class="selectEscolasDestino">'+
                '<option>Escola</option>'+
            '</select>'+
            '<button class="buttonAdicionarEscolaDestino">+</button>'+
        '</div>';

        $(this).before(html);
    });

    // Remover estado-cidade-escola
    $("#sectionConteinerPartida").on("click",".buttonRemoverEstadoCidadeChegada", function(){
        $(this).parent().remove();
    });
});