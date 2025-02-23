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
async function buscarDados() {
    const tabelaSelecionada = document.getElementById("tabelaSelecionada").value;
    
    if (!tabelaSelecionada) {
        alert("Selecione uma tabela antes de pesquisar.");
        return;
    }

    const url = `tabelas/${tabelaSelecionada}.xlsx`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao carregar: ${url}`);

        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (json.length < 2) {
            alert("A planilha selecionada não contém dados.");
            return;
        }

        const resultados = json.slice(1).map(row => ({
            numero: row[0] || "-",
            data: row[1] || "-",
            facial: row[2] || "-",
            estado: row[3] || "-",
            detalhes: row[4] || "-",
            valor: row[5] || "-"
        }));

        exibirResultados(resultados);
    } catch (error) {
        console.error("Erro ao processar:", error);
        alert("Erro ao buscar os dados. Verifique o console.");
    }
}

// Função para exibir os resultados na tabela
function exibirResultados(resultados) {
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';

    if (resultados.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">Nenhum resultado encontrado</td></tr>`;
        return;
    }

    resultados.forEach(resultado => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${resultado.numero}</td>
            <td>${resultado.data}</td>
            <td>${resultado.facial}</td>
            <td>${resultado.estado}</td>
            <td>${resultado.detalhes}</td>
            <td>${resultado.valor}</td>
        `;
        tableBody.appendChild(row);
    });
}

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

