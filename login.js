import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

window.fazerLogin = async function () {
    const loginDigitado = document.getElementById("cpf").value;
    const cpfLimpo = loginDigitado.replace(/\D/g, "");
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    // 2. Funcionário
    const funcionariosRef = collection(db, "funcionarios");
const qFunc = query(funcionariosRef, where("login", "==", loginDigitado), where("senha", "==", senha));
const resultadoFunc = await getDocs(qFunc);

if (!resultadoFunc.empty) {
    const funcionario = resultadoFunc.docs[0].data();
    localStorage.setItem("funcionarioLogado", JSON.stringify(funcionario));
    mensagem.style.color = "lightgreen";
    mensagem.textContent = "Login realizado!";
     setTimeout(() =>{
        // verificar se o usuario que logou tem permisao de ADM
        if(funcionario.permissao === "ADM"){
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "funcionario-dashboard.html";
        }
        }, 1000);
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