const { select, input, checkbox } = require("@inquirer/prompts");
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
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use espaço para dar checked/unchecked",
        choices: [...metas],
    });

    metas.forEach((m) => {
        m.checked = false;
    });

    if (respostas.length == 0) {
        console.log("Nenhuma meta foi marcada.");
        return;
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
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });
    if (realizadas.length == 0) {
        console.log("Nenhuma meta foi marcada.");
        return;
    } else {
        console.log(realizadas);
    }
};
// mesma coisa que as realizadas, porem com o sinal de "!" para inverter true/false
const metasAbertas = async () => {
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
                    name: "sair",
                    value: "sair",
                },
            ],
        });
        switch (opcao) {
            case "cadastrar":
                await cadastrar(), console.log(metas);
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
            case "sair":
                console.log("Saindo...");
                process.exit(0);
                return;
        }
    }
};
start();
