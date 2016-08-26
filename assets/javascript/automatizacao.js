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


    // BOTAO ENTRAR para mostra a tela de login
    $(".buttonEntrar").on("click",function(){
        $("#divLogin").fadeToggle();
    });

    $(".pNomeEmpresas").on("click", function(){
        $(this).next().slideToggle();
    });

    // Adicionar cidades e estados nos selects
    var estados_cidades = {};
    var cidadespartida = document.getElementById("selectCidadePartida");
    var cidadesChegada = document.getElementById("selectCidadeChegada");
    var selectEstadoPartida = document.getElementById("selectEstadoPartida");
    var selectEstadoChegada = document.getElementById("selectEstadoChegada");
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