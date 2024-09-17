const { select } = require("@inquirer/prompts");

const start = async () => {
    while (true) {
        const opcao = await select({
            message: "Menu >",
            choices: [
                { name: "cadastrar meta", value: "cadastrar" },

                { name: "sair", value: "sair" },
            ],
        });

        switch (opcao) {
            case "cadastrar":
                console.log("Cadastrando um novo cliente...");
                break;
            case "listar":
                console.log("Listando todos os clientes...");
                break;
            case "sair":
                console.log("Saindo...");
                return;
        }
    }
};

start();
