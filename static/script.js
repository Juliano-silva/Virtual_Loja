var Titulos = document.getElementById("titulo")
var Precos = document.getElementById("preco")
var Imgs = document.getElementById("img")
var Descriptions = document.getElementById("description")
var Input = document.getElementById("Input")
var Data = new Date()
Data.getDay() + "/" + Data.getMonth() + "/" + Data.getFullYear()
var array = []



var Escolha = false


document.getElementById("Yes").addEventListener("click",function(){
    if(document.getElementById("Yes").checked){
        Escolha = true
    }else{
        Escolha = false
    }
})


function Clickar(){
    $.ajax({
        url: "/Click",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ 
            titulo: Titulos.value,
            preco: Precos.value, 
            Img: Imgs.value,
            Data: Data.getDay() + "/" + Data.getMonth() + "/" + Data.getFullYear(),
            ativo: Escolha,
            description: Descriptions.value,
        })
    })
    location.reload()
}

document.getElementById("Adds").addEventListener("click",function(){
    Input.style.display = "block"
})

fetch("/Body").then((response) => response.json().then((dados) => {
    for(var i = 0 ; i < dados.length; i++){
        var Corpo = document.createElement("div")
        var Id = document.createElement("h6")
        var Titulo = document.createElement("h1")
        var Image = document.createElement("img")
        var preco = document.createElement("h3")
        var Data = document.createElement("h5")
        var description = document.createElement("p")
        var Ativo = document.createElement("h4")
        var Remove = document.createElement("button")
        var Edit = document.createElement("button")
        var Carrinho = document.createElement("button")
        Id.innerText = dados[i].id
        Image.src = dados[i].foto
        Image.addEventListener("error",function(){
            this.style.display = "none"
        })
        Titulo.innerText = dados[i].nome
        preco.innerText = dados[i].preço
        description.innerText = dados[i].description
        Data.innerText = dados[i].Data
        Ativo.innerText = dados[i].ativo
        Corpo.id = "Caixa"
        Remove.innerText = "Remover"
        Edit.innerText = "Editar"
        Carrinho.innerText = "Carrinho"
        Edit.id = Remove.id = Carrinho.id = i
        // Function Carrinho
        Carrinho.addEventListener("click",function(){
            $.ajax({
                url:"/AdicionarCarrinho",
                type:"POST",
                contentType:"application/json",
                data: JSON.stringify({"titulo":dados[this.id].nome,"preco":dados[this.id].preço,"Img":dados[this.id].foto})
            })
        })
        // Function Remove
        Remove.addEventListener("click",function(){
            var id = dados[this.id].id
            $.ajax({
                url:"/Remove",
                type:"POST",
                contentType: "application/json",
                data: JSON.stringify({value: id})
            })
        })
        // Function Search 
        document.getElementById("Search").addEventListener("keyup",function(){
            var Filtrar = document.getElementById("Search").value
            var BodyFilter = document.getElementById("Conteudo")
            var Linhas = BodyFilter.getElementsByTagName("div")
            for(let position in Linhas){
                if(true === isNaN(position)){
                    continue
                }

                let ConteudoLinhas = Linhas[position].innerHTML;


                if(true === ConteudoLinhas.toLocaleLowerCase().includes(Filtrar)){
                    Linhas[position].style.display = ""
                }else{
                    Linhas[position].style.display = "none"
                }
            }
        })

        // Function Editar
        Edit.addEventListener("click",function(){
            Input.style.display = "block"
            var id = dados[this.id].id
            Titulos.value = dados[this.id].nome
            Precos.value = dados[this.id].preço
            Imgs.value = dados[this.id].foto
            Descriptions.value = dados[this.id].description
            document.getElementById("Click").style.display = "none"
            document.getElementById("Editando").style.display = "block"
            document.getElementById("Editando").className = `${id}`
        })

        Editando.addEventListener("click",function(){
            $.ajax({
                url: "/Editar",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ 
                    titulo: Titulos.value,
                    preco: Precos.value,
                    Ids: this.className,
                    Img: Imgs.value,
                    ativo: Escolha,
                    description: Descriptions.value,
                })
            })
        })
        Corpo.append(Id,Titulo,Image,description,preco,Ativo,Data,Remove,Edit,Carrinho)
        Conteudo.append(Corpo)
    }
}))



function DROPALL(){
    $.ajax({
        url:"/DROPALL",
        type:"POST",
        contentType: "application/json"
    })
}