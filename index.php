<!DOCTYPE html>
  <?php
      $url="https://www.themealdb.com/api/json/v1/1/random.php";
      // Função que realiza as requisições à API
      function RequisicoesAPI($url)
    {
        $ch=curl_init();

        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    
        $retorno=curl_exec($ch);
        curl_close($ch);
    
        $dados=json_decode($retorno);
        return $dados;      
    }

        $pratoRandom= RequisicoesAPI($url);

        //os dados da receita
        $arrIngre=array(); 
        $ingredientes=array();
        $nome;$instrucoes;

      //cria o caminho para os ingredientes ex:ingrediente1,ingrediente2...
        for($q=1;$q<=20;$q++){
            $ingredientes[$q]="strIngredient".$q;
        }
        $e=0;
        
        //Prenche as informações da receita do dia
        foreach($pratoRandom->meals as $prato){
          $nome=$prato->strMeal;
          $video=$prato->strYoutube;
          $linkVid=explode("=",$video);      
          for($q=1;$q<=20;$q++){
                $arrIngre[$e]=$prato->{$ingredientes[$q]};    
            $e++;
          }
          
        }
     
        $urlcategoria="https://www.themealdb.com/api/json/v1/1/list.php?c=list";
        $categorias=RequisicoesAPI($urlcategoria);
      
?>

<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GoodRecipes</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/reset.css">
 </head>

<body>

    <div class="topo">      
       Good Recipes 
    </div>

    <div class="intro">
     <p>Anda ná duvida de qual prato fazer!? Confira nossas sugestões</p>
    </div>
  
    <div class="destaque">
    <h2>Confira nosso prato do dia:</h2>
        <!-- Bloco de codigo que exibe o prato do dia com os ingredites no array -->
    <div class="Refeicaodia">
     <?php echo("<p class='tituloRece'>$nome</p>"); ?>
     <p>Ingredientes:</p>
            <ul class="ingredientesRefeDia">
              <?php 
                for($i=0;$i<20;$i++){
                    if($arrIngre[$i] ==""){
                        break;
                    }else{
                          echo("<li>".$arrIngre[$i]."</li>");                        
                    }         
                } 
              ?>
            </ul> 
            <?php   if($linkVid[1]){
             echo("<iframe class='media' width='60%' height='315' src='https://www.youtube.com/embed/{$linkVid[1]}' frameborder='0'allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>");         
                }else{ 
                  echo "<h3 align='right'>Esta receita não possui video...</h3>";
             }
            ?>

    </div>

    </div><br><br>
    <p class="descFiltro"> Confira abaixo mais de nossas receitas e use o filtro de acordo com suas preferências.</p>

          <!-- Exibe as categorias das refeições que foi retornada pela requisição -->
      <form>
          <label class="lblFiltrar">Filtrar:</label> 
          <select id="selectValor" class='categorias' value="selecione"><?php 
            foreach($categorias->meals as $cat){
              echo "<option value='$cat->strCategory'>$cat->strCategory</option>";
            }
            ?></select>
          
      </form>
     <div class="lista" id="painel"><p id="sta"> Sem resultados.</p></div>
  
    <!-- Modal  -->

      <div id="ModalRece" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header" id='modelHead'>
          <span class='close'>&times;</span>
        </div>
        <div class="modal-body" id="modelBody"><div id='imgModel' class='imgModel'></div></div>
        <div class="modal-footer">
        
        </div>
        </div>

      </div>

    <script type="text/javascript" src="assets/js/script.js"></script>
</body>
</html>
