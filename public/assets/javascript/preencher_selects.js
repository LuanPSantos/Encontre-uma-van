
var estados_cidades = {};

$(document).ready(function(){

    var cidadespartida = document.getElementById("selectCidadePartida");
    var cidadesChegada = document.getElementById("selectCidadeChegada");
    var selectEstadoPartida = document.getElementById("selectEstadoPartida");
    var selectEstadoChegada = document.getElementById("selectEstadoChegada"); 

    // Adicionar cidades e estados nos selects
    firebase.database().ref('/estados-consulta').once('value').then(function(snapshot){
        estados_cidades = snapshot.val();   
        alert("Dropdown Estados foi preenchido!");
        for(var i = 0; i < estados_cidades.length; i++){
            
            $(".selectEstadosPartida").append('<option>'+ estados_cidades[i].sigla +'</option>');
            $(".selectEstadosChegada").append('<option>'+ estados_cidades[i].sigla +'</option>');
        }     
    });  

    // $(".selectEstadosPartida").on("change", this ,function(){
        
    //     for(var i = 0; i < estados_cidades.length; i++){
    //         if(estados_cidades[i].sigla == $(".selectEstadosPartida :selected").text()){
    //             $(".selectCidadesPartida").empty();
    //             for(var j = 0; j < estados_cidades[i].cidades.length; j++){                    
    //                 $(".selectCidadesPartida").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');                    
    //             }
    //         }
    //     }
    // });

    // $(".selectEstadosChegada").on("change",function(){
        
    //     for(var i = 0; i < estados_cidades.length; i++){
    //         if(estados_cidades[i].sigla == $(".selectEstadosChegada :selected").text()){
    //             $(".selectCidadesChegada").empty();
    //             for(var j = 0; j < estados_cidades[i].cidades.length; j++){                                        
    //                 $(".selectEstadosChegada").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');
    //             }
    //         }
    //     }
    // }); 

    $(".sectionConteinerSelects").on("change",".selectEstadosPartida", function(){
        
        for(var i = 0; i < estados_cidades.length; i++){
            if(estados_cidades[i].sigla == $("option:selected", this).text()){
                $(this).next(".selectCidadesPartida").empty();
                for(var j = 0; j < estados_cidades[i].cidades.length; j++){                    
                    $(this).next(".selectCidadesPartida").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');                    
                }
            }
        }
    });

     $(".sectionConteinerSelects").on("change",".selectEstadosChegada", function(){
        //alert($("option:selected", this).text());
        for(var i = 0; i < estados_cidades.length; i++){
            if(estados_cidades[i].sigla == $("option:selected", this).text()){
                $(this).next(".selectCidadesChegada").empty();
                for(var j = 0; j < estados_cidades[i].cidades.length; j++){                    
                    $(this).next(".selectCidadesChegada").append('<option>'+ estados_cidades[i].cidades[j] +'</option>');                    
                }
            }
        }
    });
});