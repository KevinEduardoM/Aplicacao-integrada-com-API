const valorFiltrar= document.getElementById('selectValor')
 
    //Limpa o painel que exibe aas receitas de determinada categoria
 function limpar(){
     const painel=document.getElementById('painel') 

     var contador=painel.childNodes.length;

     for (let index = 0; index < contador; index++) {
         let card=document.getElementById(index)
         let tes=document.getElementById('sta')
       if(card !==null && tes==null){
             painel.removeChild(card)
       }else {
          painel.removeChild(tes)
       }
        // console.log("Remover"+index)
     }
    //  console.log("valor do painel:"+painel.childNodes.length)  
}
    //Evento que envia a requisição das receitas
valorFiltrar.addEventListener('change',function(){
    Filtro=this.value
    // console.log(Filtro)
    const options={
        methodd:'get',
        mode:'cors',
        cache:'default'
    }

    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${Filtro}`, options)
    .then(response =>{response.json()
        .then(data=>PrencherLista(data))  
        //.catch(e=>console.log('Erro na requisição em formato json'))  
    })
    .catch(e=>console.log('Erro na requisição'))

})


function PrencherLista(data){
   // console.log(typeof(data))
   // var crian=document.querySelector('.card')
    
     limpar()
     for(const obj in data.meals){ 
      //Cria o elemento que vai receber a div card
      var pai=document.getElementById('painel') 
      var card=document.createElement('div')     
        let id=data.meals[obj].idMeal
        let nomereceita= document.createElement('h3')
        let imgreceita=document.createElement('img')
        
        imgreceita.src=data.meals[obj].strMealThumb
        card.classList.add('card')       
        card.id=obj
        card.addEventListener('click',function (params) {
            exibirModal(id)
        })
        
        nomereceita.classList.add('titulos')
        nomereceita.textContent=data.meals[obj].strMeal
        card.appendChild(imgreceita)
        card.appendChild(nomereceita)
        pai.appendChild(card)
      
    } 
}


    function exibirModal(id) {
        let modal = document.getElementById('ModalRece')
             RequisicaoDetalhadaReceite(id)  
         modal.style.display="block";
          
        // evento close no X
        var span = document.getElementsByClassName("close")[0];
          span.onclick=function() {
              modal.style.display = "none"; 
              limparModal()
           }
        //Quando o clicar fora do modal ele some
          window.onclick = function(event) {
              if (event.target == modal) {
               modal.style.display = "none";
               limparModal()
              }
            }       
            
    }

    
    //Função que retorna mais detalhes da receitaa para exibir no modal 
    function RequisicaoDetalhadaReceite(id) {
        const options={
            methodd:'get',
            mode:'cors',
            cache:'default'
        }
    
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, options)
        .then(response =>{response.json()
            .then(data=>PrencherModal(data))  
            //.catch(e=>console.log('Erro na requisição em formato json'))  
        } )
        .catch(e=>console.log('Erro na requisição de dados da receita'))  
    }    
    
    
    function PrencherModal(dados) {

        const modalHeader=document.querySelector('.modal-header')
        const modalBody=document.querySelector('.modal-body')
        const modalfooter=document.querySelector('.modal-footer')
        const imgModel=document.getElementById('imgModel') 
        
        let tituloRece=document.createElement("h1")
        tituloRece.textContent=dados.meals[0].strMeal
        tituloRece.id="tReceita"
        modalHeader.appendChild(tituloRece)

         var listaIng=[]
         var ingredient=[]

         //Cria o caminho para os ingredientes:ingrediente1,ingrediente2... o total é vinte pois esse é o número máximo de ingredientes
         for (let index = 1; index <=20; index++) {
                  ingredient.push("strIngredient"+index)       
         }  
         //adiciona os ingredientes em um array   
         for (let index = 0; index < 20; index++) {         
             if(dados['meals'][0][ingredient[index]]){    
                listaIng.push(dados['meals'][0][ingredient[index]])     
            }else{
                break
            }
        }

        //Criação dos elementos  html 
        let lista=document.createElement('ul')
        let img=document.createElement('img')

        img.src=dados.meals[0].strMealThumb
        img.id="imgReceita"
        img.classList.add('imgRece')
        
        lista.id="listaI"
        lista.classList.add("listaIngr")


        for (let index = 0; index < listaIng.length; index++) {
          let ingr=document.createElement('li')
          ingr.textContent=listaIng[index]
          lista.appendChild(ingr)        
        }
       
       modalBody.appendChild(lista)
       imgModel.appendChild(img)
        modalfooter.innerHTML=dados.meals[0].strInstructions        
    }

    //Apaaga os dados da receita no Modal
    function limparModal() {
        const mheader=document.getElementById('modelHead') 
        const mbody=document.getElementById('modelBody') 
        const imgModel=document.getElementById('imgModel') 

        var contador=mheader.childNodes.length;
        var tituRece=document.getElementById("tReceita")
        let ingr=document.getElementById("listaI")
        let img=document.getElementById("imgReceita")
      
        if(tituRece!==null){
            mheader.removeChild(tituRece)
            mbody.removeChild(ingr)
            imgModel.removeChild(img)
        }
    }

   
    