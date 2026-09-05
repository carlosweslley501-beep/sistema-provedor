import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

window.fazerLogin = async function () {
    const loginDigitado = document.getElementById("cpf").value.trim();
    const cpfLimpo = loginDigitado.replace(/\D/g, "");
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (!loginDigitado || !senha) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    mensagem.style.color = "white";
    mensagem.textContent = "Verificando...";

    // 1. Tenta como Funcionário / ADM
    try {
        const funcionariosRef = collection(db, "funcionarios");
        const qFunc = query(funcionariosRef, where("login", "==", loginDigitado), where("senha", "==", senha));
        const resultadoFunc = await getDocs(qFunc);

        if (!resultadoFunc.empty) {
            const funcionario = resultadoFunc.docs[0].data();
            funcionario.id = resultadoFunc.docs[0].id;
            localStorage.setItem("funcionarioLogado", JSON.stringify(funcionario));

            mensagem.style.color = "lightgreen";
            mensagem.textContent = "Login realizado!";

            setTimeout(() => {
                if (funcionario.permissao === "ADM") {
                    window.location.replace("dashboard.html");
                } else {
                    window.location.replace("funcionario-dashboard.html");
                }
            }, 600);
            return;
        }
    } catch (erro) {
        console.error("Erro ao verificar funcionário:", erro);
    }

    // 2. Tenta como Cliente
    try {
        const clientesRef = collection(db, "clientes");

        let q = query(clientesRef, where("cpf", "==", cpfLimpo), where("senha", "==", senha));
        let resultado = await getDocs(q);

        if (resultado.empty) {
            q = query(clientesRef, where("cpf", "==", loginDigitado), where("senha", "==", senha));
            resultado = await getDocs(q);
        }

        if (!resultado.empty) {
            const clienteDoc = resultado.docs[0];
            const clienteDados = clienteDoc.data();
            clienteDados.id = clienteDoc.id;
            clienteDados.tipo = "cliente";

            // Salva nas duas chaves para não ser bloqueado por nenhuma trava de rota
            localStorage.setItem("clienteLogado", JSON.stringify(clienteDados));
            localStorage.setItem("funcionarioLogado", JSON.stringify(clienteDados));

            mensagem.style.color = "lightgreen";
            mensagem.textContent = "Login aprovado! Entrando...";

            setTimeout(() => {
                window.location.replace("cliente-dashboard.html");
            }, 600);
        } else {
            mensagem.style.color = "red";
            mensagem.textContent = "CPF/login ou senha incorretos!";
        }
    } catch (erro) {
        console.error("Erro ao verificar cliente:", erro);
        mensagem.style.color = "red";
        mensagem.textContent = "Erro de conexão: " + erro.message;
    }
};