// Usuários cadastrados no sistema
const users = [
    { username: "juliano", password: "1234" },
    { username: "cherinho", password: "1234" },
    { username: "amore", password: "1234" },
];

// Função de login
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "consulta.html";
    } else {
        errorMessage.textContent = "Usuário ou senha incorretos!";
    }
}

// Função de logout
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Função para carregar as tabelas do diretório "tabelas/"
// script.js
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const tableName = document.getElementById('tableName').value.toLowerCase();
  const resultsBody = document.getElementById('resultsBody');
  resultsBody.innerHTML = '';

  // Simulação de dados das tabelas
  const tables = {
    cobre: [
      { resultado: 'Resultado 1', data: '01/01/2022', facial: 'Facial 1', estado: 'Estado 1', detalhes: 'Detalhes 1', valor: 'Valor 1' },
      { resultado: 'Resultado 2', data: '02/01/2022', facial: 'Facial 2', estado: 'Estado 2', detalhes: 'Detalhes 2', valor: 'Valor 2' },
    ],
    prata: [
      { resultado: 'Resultado A', data: '03/01/2022', facial: 'Facial A', estado: 'Estado A', detalhes: 'Detalhes A', valor: 'Valor A' },
      { resultado: 'Resultado B', data: '04/01/2022', facial: 'Facial B', estado: 'Estado B', detalhes: 'Detalhes B', valor: 'Valor B' },
    ],
    // Adicione outras tabelas conforme necessário
  };

  if (tables[tableName]) {
    tables[tableName].forEach(row => {
      const tr = document.createElement('tr');
      for (const key in row) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }
      resultsBody.appendChild(tr);
    });
  } else {
    const

// BOTÃO DE ORIENTAÇÃO
document.addEventListener("DOMContentLoaded", function () {
    const btnOrientacoes = document.getElementById("btnOrientacoes");
    const btnFechar = document.getElementById("btnFechar");
    const manual = document.getElementById("manual");

    if (btnOrientacoes && btnFechar && manual) {
        btnOrientacoes.addEventListener("click", () => {
            manual.classList.toggle("ativo");
        });

        btnFechar.addEventListener("click", () => {
            manual.classList.remove("ativo");
        });
    }
});

