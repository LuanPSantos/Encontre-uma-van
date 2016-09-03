
var estados_cidades = {};

$(document).ready(function(){

    var cidadespartida = document.getElementById("selectCidadePartida");
    var cidadesChegada = document.getElementById("selectCidadeChegada");
    var selectEstadoPartida = document.getElementById("selectEstadoPartida");
    var selectEstadoChegada = document.getElementById("selectEstadoChegada"); 

    // Adicionar cidades e estados nos selects
    firebase.database().ref('/estados-consulta').once('value').then(function(snapshot){
        estados_cidades = snapshot.val();   

        for(var i = 0; i < estados_cidades.length; i++){
            
            $(".selectEstadoPartida").append('<option>'+ estados_cidades[i].sigla +'</option>');
            $(".selectEstadoChegada").append('<option>'+ estados_cidades[i].sigla +'</option>');
        }     
    });   

    $(".selectEstadoPartida").on("change",function(){
        
        for(var i = 0; i < estados_cidades.length; i++){
            if(estados_cidades[i].sigla == $(".selectEstadoPartida :selected").text()){
                $(".selectCidadePartida").empty();
                for(var j = 0; j < estados_cidades[i].cidades.length; j++){                    
                    $(".selectCidadePartida").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');                    
                }
            }
        }
    });

    $(".selectEstadoChegada").on("change",function(){
        
        for(var i = 0; i < estados_cidades.length; i++){
            if(estados_cidades[i].sigla == $(".selectEstadoChegada :selected").text()){
                $(".selectCidadeChegada").empty();
                for(var j = 0; j < estados_cidades[i].cidades.length; j++){                                        
                    $(".selectCidadeChegada").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');
                }
            }
        }
    }); 

    //Implementar como add os estados e as cidades nos selects
});