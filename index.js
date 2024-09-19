const { select, input } = require("@inquirer/prompts");
let meta = {
    value: "correr até passar mal",
    checked: false,
};
let metas = [meta];

const cadastrar = async () => {
    const meta = await input({ message: "digite a meta" });

    if (meta == "") {
        console.log("Meta não pode estar vazia.");
        return;
    }

    metas.push({ value: meta, checked: false });
};

const start = async () => {
    while (true) {
        //! Toda função que receber await deverá ter tambem o async
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar",
                },
                {
                    name: "atualizar meta",
                    value: "atualizar",
                },
                {
                    name: "excluir meta",
                    value: "excluir",
                },
                {
                    name: "listar metas",
                    value: "listar",
                },
                {
                    name: "sair",
                    value: "sair",
                },
            ],
        });
        switch (opcao) {
            case "cadastrar":
                await cadastrar(), console.log(metas);
                break;
            case "atualizar":
                console.log("Atualizado");
                break;
            case "excluir":
                console.log("Excluido");
                break;
            case "listar":
                console.log("Listado");
                break;
            case "sair":
                console.log("Saindo...");
                process.exit(0);
                return;
        }
    }
};
start();
