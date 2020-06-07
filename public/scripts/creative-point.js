

function populateUFs(){
      const estadoUF = document.querySelector("select[name=uf]") 

      fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((resposta)=>{return resposta.json()})
      .then( estados => {
             
              for (const estado of estados){

              estadoUF.innerHTML += `<option value ="${estado.id}">${estado.nome}</option>`
              }
            
            })
}



populateUFs()


function selecionarCidades(event){
    const SelecionarCidade = document.querySelector("select[name=city");
    
    const estadoInput = document.querySelector("input[name=state") 

    const ufValue = event.target.value
    
    const indexDoEstadoSelecionado = event.target.selectedIndex
    
    estadoInput.value = event.target.options[indexDoEstadoSelecionado].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
      
    
    SelecionarCidade.innerHTML = "<option value>Selecione a Cidade</option>"
    SelecionarCidade.disabled = true
    
    fetch(url)
    .then((resposta)=>{return resposta.json()})
    .then( cidades => {
        
           
            for (const cidade of cidades){

                SelecionarCidade.innerHTML += `<option value ="${cidade.nome}">${cidade.nome}</option>`
            }
            SelecionarCidade.disabled = false 
          
          })        



}



document
       .querySelector("select[name=uf]")/*procura  o seletor*/
       .addEventListener("change" , selecionarCidades) /*irá printar a msg "mudei" no console} )/*adiciona a opção de "ouvir" o tipo de evento e pode executar alguma coisa no segundo parametro , no caso uma função*/  


//--------------ITEMS DE COLETA-----------------------


const ColetarItens = document.querySelectorAll(".items-grid li")

for(const item of ColetarItens){
   item.addEventListener("click" , ItemSelecionado)

}

const itensColetados = document.querySelector("input[name=items]") 

let itensSelecionados = []

function ItemSelecionado(event) { 
  const itemLi = event.target
  
  itemLi.classList.toggle("selected")// adiona ou remove uma classe com JS
  
  
  const itemId = itemLi.dataset.id
  





// verificar se existem itens selecionados , se sim 
//pegar os itens selecionados 

const jáSelecionado = itensSelecionados.findIndex(item => {
  const itemEncontrado = item == itemId /* definirá se é true ou false*/
  return itemEncontrado
})

/* o console.log(jáSelecionado != -1 ) vai exibir o index de elementos que estejam dentro do array*/


// se já estiver selecionado , tirar da seleção 
if (jáSelecionado >= 0 ){
  //tirar da seleção 

  const itensFiltrados = itensSelecionados.filter(item => {
       const itemDiferente = item != itemId // vai retornar false para que o item  seja removido
       return itemDiferente

  })
  
  itensSelecionados = itensFiltrados

} else {
   // se não estiver selecionado , adicionar à seleção
   //adicionar à coleção 
   itensSelecionados.push(itemId)
}

/* atualizar o campo escondido com os itens selecionados */
 itensColetados.value = itensSelecionados

}