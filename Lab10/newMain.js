document.addEventListener("DOMContentLoaded", () => {
    inicializarFiltros();
    carregarProdutos();
    atualizaCesto();
  
    document.getElementById("categoriaFiltro").addEventListener("change", carregarProdutos);
    document.getElementById("ordenacaoPreco").addEventListener("change", carregarProdutos);
    document.getElementById("pesquisaProduto").addEventListener("input", carregarProdutos);
    document.getElementById("checkout").addEventListener("click", finalizarCompra);
  });
  
  // Função para inicializar os filtros de categorias
  function inicializarFiltros() {
    fetch('https://deisishop.pythonanywhere.com/categories/')
      .then(response => response.json())
      .then(categorias => {
        const select = document.getElementById("categoriaFiltro");
        categorias.forEach(categoria => {
          const option = document.createElement("option");
          option.value = categoria;
          option.textContent = categoria;
          select.appendChild(option);
        });
      });
  }
  
  // Função para carregar os produtos com filtros, ordenação e pesquisa
  function carregarProdutos() {
    const categoria = document.getElementById("categoriaFiltro").value;
    const ordenacao = document.getElementById("ordenacaoPreco").value;
    const pesquisa = document.getElementById("pesquisaProduto").value.toLowerCase();
  
    fetch('https://deisishop.pythonanywhere.com/products/')
      .then(response => response.json())
      .then(produtos => {
        let produtosFiltrados = produtos;
  
        // Aplicar filtros
        if (categoria) {
          produtosFiltrados = produtosFiltrados.filter(produto => produto.category === categoria);
        }
  
        // Aplicar pesquisa
        if (pesquisa) {
          produtosFiltrados = produtosFiltrados.filter(produto => produto.title.toLowerCase().includes(pesquisa));
        }
  
        // Ordenar produtos
        produtosFiltrados.sort((a, b) => ordenacao === "asc" ? a.price - b.price : b.price - a.price);
  
        exibirProdutos(produtosFiltrados);
      });
  }
  
  // Função para exibir produtos no HTML
  function exibirProdutos(produtos) {
    const container = document.getElementById("produtos");
    container.innerHTML = "";
    produtos.forEach(produto => {
      const item = criarProduto(produto);
      container.appendChild(item);
    });
  }
  
  // Função para criar a exibição de um produto
  function criarProduto(produto) {
    const artigo = document.createElement("article");
  
    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;
  
    const imagem = document.createElement("img");
    imagem.src = produto.image;
    imagem.alt = produto.title;
  
    const descricao = document.createElement("p");
    descricao.textContent = produto.description;
  
    const preco = document.createElement("p");
    preco.textContent = `Preço: €${produto.price.toFixed(2)}`;
  
    const botao = document.createElement("button");
    botao.textContent = "+ Adicionar ao Cesto";
    botao.addEventListener("click", () => adicionarAoCesto(produto));
  
    artigo.append(titulo, imagem, descricao, preco, botao);
    return artigo;
  }
  
  // Função para adicionar produtos ao cesto
  function adicionarAoCesto(produto) {
    let cesto = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    cesto.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
    atualizaCesto();
  }
  
// Função para atualizar o cesto
function atualizaCesto() {
    const cestoContainer = document.getElementById("cesto");
    cestoContainer.innerHTML = '<h2>Cesto de Compras</h2>'; // Reinicia o conteúdo do cesto
  
    const cesto = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    let precoTotal = 0;
  
    // Adiciona cada produto ao cesto
    cesto.forEach(produto => {
      const artigo = criaProdutoCesto(produto);
      cestoContainer.appendChild(artigo);
      precoTotal += produto.price;
    });
  
    // Exibir o preço total
    const total = document.createElement("p");
    total.textContent = `Total: €${precoTotal.toFixed(2)}`;
    cestoContainer.appendChild(total);
  
    // Adicionar questionário para o estudante e o cupão
    const questionario = document.createElement("div");
    questionario.id = "questionario";
  
    const estudanteLabel = document.createElement("label");
    estudanteLabel.htmlFor = "estudante";
    estudanteLabel.textContent = "É estudante do DEISI? ";
  
    const estudanteCheckbox = document.createElement("input");
    estudanteCheckbox.type = "checkbox";
    estudanteCheckbox.id = "estudante";
  
    const couponLabel = document.createElement("label");
    couponLabel.htmlFor = "coupon";
    couponLabel.textContent = "Cupão de desconto: ";
  
    const couponInput = document.createElement("input");
    couponInput.type = "text";
    couponInput.id = "coupon";
    couponInput.placeholder = "Digite seu cupão";
  
    questionario.append(estudanteLabel, estudanteCheckbox, document.createElement("br"), couponLabel, couponInput);
    cestoContainer.appendChild(questionario);
  
    // Adicionar o botão de checkout
    const botaoCheckout = document.createElement("button");
    botaoCheckout.id = "checkout";
    botaoCheckout.textContent = "Finalizar Compra";
    botaoCheckout.addEventListener("click", finalizarCompra);
    cestoContainer.appendChild(botaoCheckout);
  
    // Espaço para exibir informações após o checkout
    const resultado = document.createElement("div");
    resultado.id = "resultadoCheckout";
    cestoContainer.appendChild(resultado);
  }
  
  // Função para criar um artigo no cesto
  function criaProdutoCesto(produto) {
    const artigo = document.createElement("article");
  
    const titulo = document.createElement("h4");
    titulo.textContent = produto.title;
  
    const preco = document.createElement("p");
    preco.textContent = `Preço: €${produto.price.toFixed(2)}`;
  
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "- Remover";
    botaoRemover.addEventListener("click", () => removerDoCesto(produto));
  
    artigo.append(titulo, preco, botaoRemover);
    return artigo;
  }
  
  // Função para remover produtos do cesto
  function removerDoCesto(produto) {
    let cesto = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    cesto = cesto.filter(item => item.id !== produto.id);
    localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));
    atualizaCesto();
  }
  
// Função para finalizar a compra
function finalizarCompra() {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  const idsProdutos = cesto.map(produto => produto.id);

  const estudante = document.getElementById("estudante").checked;
  const coupon = document.getElementById("coupon").value.trim();

  const body = {
    products: idsProdutos,
    student: estudante,
    coupon: coupon || null, // Envia null caso o campo esteja vazio
    name: "Maria Lisboa" // Este valor pode ser dinâmico
  };

  fetch('https://deisishop.pythonanywhere.com/buy/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(dados => {
      // Exibir os resultados na secção do cesto
      const resultadoCheckout = document.getElementById("resultadoCheckout");
      resultadoCheckout.innerHTML = `
        <p><strong>Referência de Pagamento:</strong> ${dados.payment_reference}</p>
        <p><strong>Total a Pagar:</strong> €${dados.total.toFixed(2)}</p>
      `;
    })
    .catch(error => {
      console.error("Erro no checkout:", error);
      alert("Ocorreu um erro ao processar o checkout. Tente novamente.");
    });
}
  