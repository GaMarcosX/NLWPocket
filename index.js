const { select, input, checkbox } = require("@inquirer/prompts");
// armazenar todos
const fs = require("fs").promises;

let mensagem = "Bem vindo ao App de Metas! :)";

let meta = {};

let metas = [meta];

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf8");
        metas = JSON.parse(dados);
    } catch (err) {
        metas = [];
    }
};
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
};

const cadastrar = async () => {
    const meta = await input({ message: "digite a meta" });

    if (meta == "") {
        mensagem = "Meta não pode estar vazia.";
        return;
    }
    if (meta !== "") {
        mensagem = "Meta " + "'" + meta + "'" + " cadastrada com Sucesso!";
    }

    metas.push({ value: meta, checked: false });

    mensagem = "Meta " + "'" + meta + "'" + " cadastrada com Sucesso!";
};
const listarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Você precisa criar uma meta!";
        return;
    }
    const respostas = await checkbox({
        message: "use espaço para dar checked/unchecked",
        choices: [...metas],
        instructions: false,
    });

    metas.forEach((m) => {
        m.checked = false;
    });

    if (respostas.length == 0) {
        mesangem = "Nenhuma meta foi marcada.";
        return;
    }
    if (respostas.length !== 0) {
        mensagem = respostas.length + " meta(s) marcada(s) como concluída(s)";
    }

    // sistema de marcar checkbox
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        });
        meta.checked = true;
    });

    //! Outra forma de resolver:
    // respotas.forEach((resposta) => {
    //     const index = metas.findIndex((m) => m.value === resposta);
    //     metas[index].checked = !metas[index].checked;
    // });

    console.log(
        "Metas marcadas:",
        metas.filter((m) => m.checked)
    );
};
const metasRealizadas = async () => {
    if (metas.length == 0) {
        mensagem = "Você precisa criar uma meta!";
        return;
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });
    if (realizadas.length == 0) {
        mensagem = "Nenhuma meta foi marcada.";
        return;
    } else {
        console.log(realizadas);
    }

    await select({
        message: "Você tem " + realizadas.length + " metas realizadas.",
        choices: [...realizadas],
    });
};
// mesma coisa que as realizadas, porem com o sinal de "!" para inverter true/false
const metasAbertas = async () => {
    if (metas.length == 0) {
        mensagem = "Você precisa criar uma meta!";
        return;
    }
    const abertas = metas.filter((meta) => {
        return !meta.checked;
    });
    if (abertas.length == 0) {
        console.log("Nenhuma meta aberta.");
        return;
    } else {
        console.log(abertas);
    }

    await select({
        message: "Você tem " + abertas.length + " metas abertas.",
        choices: [...abertas],
    });
};

const deletarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Você precisa criar uma meta para deletar uma!";
        return;
    }
    const metasDesmarcadas = metas.map((metas) => {
        return { value: metas.value, checked: false };
    });

    const itensADeletar = await checkbox({
        message: "selecione com espaço as que deseja deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    });

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        });
    });

    mensagem = "'" + itensADeletar + "'" + " deletado(s) da lista!";
};

const mostrarMensagens = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
};

const start = async () => {
    await carregarMetas();
    while (true) {
        mostrarMensagens();
        await salvarMetas();
        // Toda função que receber await deverá ter tambem o async
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar",
                },
                {
                    name: "listar metas",
                    value: "listar",
                },
                {
                    name: "metas realizadas",
                    value: "realizar",
                },
                {
                    name: "metas abertas",
                    value: "abertas",
                },
                {
                    name: "deletar metas",
                    value: "deletar",
                },
                {
                    name: "sair",
                    value: "sair",
                },
            ],
        });
        switch (opcao) {
            case "cadastrar":
                await cadastrar();
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizar":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "deletar":
                await deletarMetas();
                break;
            case "sair":
                console.log("Saindo...");
                console.clear;
                process.exit(0);
        }
    }
};
start();

// concluido em 21/09/24
