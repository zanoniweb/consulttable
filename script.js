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
    const tabelaSelecionada = document.getElementById('tabelaSelect').value;
    if (!tabelaSelecionada) {
        alert("Selecione uma tabela antes de pesquisar.");
        return;
    }

    const url = `tabelas/${tabelaSelecionada}.xlsx`; // Caminho correto do arquivo

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao carregar: ${url}`);

        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        let resultados = json.slice(1).map(row => ({
            numero: row[0] || 'N/A',
            data: row[1] || 'N/A',
            facial: row[2] || 'N/A',
            estado: row[3] || 'N/A',
            detalhes: row[4] || 'N/A',
            valor: row[5] || 'N/A'
        }));

        exibirResultados(resultados);
    } catch (error) {
        console.error("Erro ao processar:", error);
        alert("Erro ao buscar os dados. Verifique o console.");
    }
}

function exibirResultados(resultados) {
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';

    if (resultados.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">Nenhum resultado encontrado</td></tr>`;
        return;
    }

    resultados.forEach(resultado => {

        const tableBody = document.querySelector('#resultTable tbody');

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
document.getElementById("btnOrientacoes").addEventListener("click", function () {
    document.getElementById("manual").classList.toggle("ativo");
});


document.getElementById("btnFechar").addEventListener("click", function () {
    document.getElementById("manual").classList.remove("ativo");
});


