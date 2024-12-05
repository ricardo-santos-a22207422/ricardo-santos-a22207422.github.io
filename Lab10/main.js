document.addEventListener("DOMContentLoaded", () => {
  fetch('https://deisishop.pythonanywhere.com/produtos/')
    .then(response => response.json())
    .then(produtos => carregarProdutos(produtos))
    atualizaCesto(); // Atualiza o cesto ao carregar a página
  });
  
  // Função para carregar e exibir os produtos na página principal
  function carregarProdutos(produtos) {
    const container = document.getElementById('produtos');
    produtos.forEach(produto => {
      const item = criarProduto(produto);
      container.appendChild(item);
    });
  }
  
  // Função para criar a exibição de um produto na página principal
  function criarProduto(produto) {
    const artigo = document.createElement('article');
  
    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;
  
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
  
    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
  
    const preco = document.createElement('p');
    preco.textContent = `Preço: €${produto.price}`;
  
    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao Cesto';
    botao.addEventListener('click', () => adicionarAoCesto(produto));
  
    artigo.append(titulo, imagem, descricao, preco, botao);
    return artigo;
  }
  
  // Função para adicionar produtos ao cesto e atualizar o localStorage
  function adicionarAoCesto(produto) {
    let cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    cesto.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
    atualizaCesto();
  }
  
  // Função para atualizar a exibição do cesto
  function atualizaCesto() {
    const cestoContainer = document.getElementById('cesto');
    cestoContainer.innerHTML = '<h2>Cesto de Compras</h2>'; // Reinicia o conteúdo do cesto
  
    let cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    let precoTotal = 0;
  
    cesto.forEach(produto => {
      const artigoCesto = criaProdutoCesto(produto);
      cestoContainer.appendChild(artigoCesto);
      precoTotal += produto.price;
    });
  
    // Exibir o preço total
    const total = document.createElement('p');
    total.textContent = `Total: €${precoTotal.toFixed(2)}`;
    cestoContainer.appendChild(total);
  }
  
  // Função para criar um artigo do produto no cesto
  function criaProdutoCesto(produto) {
    const artigo = document.createElement('article');
  
    const titulo = document.createElement('h4');
    titulo.textContent = produto.title;
  
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
  
    const preco = document.createElement('p');
    preco.textContent = `Preço: €${produto.price}`;
  
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '- Remover do Cesto';
    botaoRemover.addEventListener('click', () => removerDoCesto(produto));
  
    artigo.append(titulo, imagem, preco, botaoRemover);
    return artigo;
  }
  
  // Função para remover produtos do cesto e atualizar o localStorage
  function removerDoCesto(produto) {
    let cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    
    // Filtra o produto pelo ID para removê-lo
    cesto = cesto.filter(item => item.id !== produto.id);
    
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
    atualizaCesto();
  }
  