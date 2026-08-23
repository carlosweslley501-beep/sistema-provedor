import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const funcionarios = [
    { login: "func1", senha: "func123", nome: "Carlos Souza" },
    { login: "func2", senha: "func123", nome: "Fernanda Lima" }
];

window.fazerLogin = async function () {
    const loginDigitado = document.getElementById("cpf").value;
    const cpfLimpo = loginDigitado.replace(/\D/g, "");
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    // 1. ADM
    if (loginDigitado === "ADM" && senha === "1025") {
        mensagem.style.color = "lightgreen";
        mensagem.textContent = "Login realizado!";
        setTimeout(() => window.location.href = "dashboard.html", 500);
        return;
    }

    // 2. Funcionário
    const funcionario = funcionarios.find(f => f.login === loginDigitado && f.senha === senha);
    if (funcionario) {
        localStorage.setItem("funcionarioLogado", JSON.stringify(funcionario));
        mensagem.style.color = "lightgreen";
        mensagem.textContent = "Login realizado!";
        setTimeout(() => window.location.href = "funcionario-dashboard.html", 500);
        return;
    }

    // 3. Cliente (busca no Firebase)
    mensagem.style.color = "white";
    mensagem.textContent = "Verificando...";

    try {
        const clientesRef = collection(db, "clientes");
        const q = query(clientesRef, where("cpf", "==", cpfLimpo), where("senha", "==", senha));
        const resultado = await getDocs(q);

        if (!resultado.empty) {
            const clienteDoc = resultado.docs[0];
            const clienteDados = clienteDoc.data();
            clienteDados.id = clienteDoc.id;

            localStorage.setItem("clienteLogado", JSON.stringify(clienteDados));
            mensagem.style.color = "lightgreen";
            mensagem.textContent = "Login realizado!";
            setTimeout(() => window.location.href = "cliente-dashboard.html", 500);
        } else {
            mensagem.style.color = "red";
            mensagem.textContent = "CPF/login ou senha incorretos!";
        }
    } catch (erro) {
        mensagem.style.color = "red";
        mensagem.textContent = "Erro ao verificar login: " + erro.message;
    }
};