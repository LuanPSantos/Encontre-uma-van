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

    // ADD nova escola na sessão de chegada
    $(".buttonAdicionarEscolaDestino").on("click", function(){
        var html = 
        '<div class="divConteinerEscolaDestino">'+
            '<select class="selectEscolasDestino">'+
                '<option>Escola</option>'+
            '</select>'+
            '<button class="buttonRemoverEscolaDestino">-</button>'+
        '</div>';

        $(this).before(html);
    });

    $(".buttonRemoverEscolaDestino").on("click", function(){
        // Acho que nao funciona porque os intem desse seletor sao adicionados uma vez, quando a pagina carrega
        // e por isso os novos adicionados sao funcionam, por que eles sao estao no seletor.
        alert("oi");
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
});