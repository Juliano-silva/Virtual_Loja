fetch("/Receber").then((response) => response.json().then((dados) => {
    for(var i = 0 ; i < dados.length; i++){
        var Caixa = document.createElement("div")
        var Titulo = document.createElement("h1")
        var Preço = document.createElement("h6")
        var Image = document.createElement("img")
        Titulo.innerText = dados[i].nome
        Preço.innerText = dados[i].preço
        Image.src = dados[i].foto
        Caixa.append(Titulo,Preço,Image)
        document.getElementById("Conteudo_Carrinho").append(Caixa)
}}))

function Comprar(){
    $.ajax({
        url:"/Comprar",
        type:"POST",
        contentType:"application/json",
    })
    alert("Obrigado pela Compra")    
}
