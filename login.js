const funcionarios = [
    { login: "func1", senha: "func123", nome: "Carlos Souza" },
    { login: "func2", senha: "func123", nome: "Fernanda Lima" }
];

const clientes = [
    {
        cpf: "12345678900",
        senha: "1234",
        nome: "João Silva",
        plano: "Fibra 200MB",
        valorMensalidade: 99.90,
        faturas: [
            { mes: "Jun/2026", valor: 99.90, status: "pago", dataPagamento: "05/06/2026" },
            { mes: "Jul/2026", valor: 99.90, status: "pago", dataPagamento: "05/07/2026" },
            { mes: "Ago/2026", valor: 99.90, status: "pendente", vencimento: "05/08/2026" }
        ]
    },
    {
        cpf: "98765432100",
        senha: "1234",
        nome: "Maria Santos",
        plano: "Fibra 400MB",
        valorMensalidade: 119.90,
        faturas: [
            { mes: "Jun/2026", valor: 119.90, status: "pago", dataPagamento: "07/06/2026" },
            { mes: "Jul/2026", valor: 119.90, status: "atrasado", vencimento: "07/07/2026" },
            { mes: "Ago/2026", valor: 119.90, status: "pendente", vencimento: "07/08/2026" }
        ]
    }
];

function fazerLogin() {
    const loginDigitado = document.getElementById("cpf").value;
    const cpfLimpo = loginDigitado.replace(/\D/g, "");
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (loginDigitado === "ADM" && senha === "1025") {
        mensagem.style.color = "lightgreen";
        mensagem.textContent = "Login realizado!";
        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 500);
        return;
    }

    const funcionario = funcionarios.find(f => f.login === loginDigitado && f.senha === senha);
    if (funcionario) {
        localStorage.setItem("funcionarioLogado", JSON.stringify(funcionario));
        mensagem.style.color = "lightgreen";
        mensagem.textContent = "Login realizado!";
        setTimeout(function () {
            window.location.href = "funcionario-dashboard.html";
        }, 500);
        return;
    }

    const cliente = clientes.find(c => c.cpf === cpfLimpo && c.senha === senha);
    if (cliente) {
        localStorage.setItem("clienteLogado", JSON.stringify(cliente));
        mensagem.style.color = "lightgreen";
        mensagem.textContent = "Login realizado!";
        setTimeout(function () {
            window.location.href = "cliente-dashboard.html";
        }, 500);
        return;
    }

    mensagem.style.color = "red";
    mensagem.textContent = "Login ou senha incorretos!";
}