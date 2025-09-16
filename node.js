const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let estudantes = [
    { nome: "Matheus", idade: 16, notas: [7, 8, 9] },
    { nome: "Victoria", idade: 18, notas: [9, 7, 8] },
    { nome: "Max", idade: 19, notas: [6, 5, 7] }
];
const calcularMedia = (notas) => notas.reduce((acc, n) => acc + n, 0) / notas.length;
const validarNotas = (notas) => notas.every(n => !isNaN(n) && n >= 0 && n <= 10);
const cadastrarEstudante = () => {
    rl.question("Nome do estudante: ", (nome) => {
        if (!nome.trim()) return cadastrarEstudante();
        rl.question("Idade: ", (idadeStr) => {
            const idade = Number(idadeStr);
            if (isNaN(idade) || idade <= 0) return cadastrarEstudante();
            rl.question("Notas separadas por vírgula: ", (notasStr) => {
                const notas = notasStr.split(',').map(Number);
                if (!validarNotas(notas)) return cadastrarEstudante();
                estudantes.push({ nome, idade, notas });
                console.log("Estudante cadastrado com sucesso!\n");
                menu();
            });
        });
    });
};
const listarEstudantes = () => {
    if (estudantes.length === 0) return console.log("Nenhum estudante cadastrado.\n");
    estudantes.forEach(({ nome, idade, notas }, i) => {
        console.log(`${i + 1}. ${nome} - Idade: ${idade} - Notas: ${notas.join(", ")} - Média: ${calcularMedia(notas).toFixed(2)}`);
    });
    console.log("");
};
const buscarEstudante = () => {
    rl.question("Digite o nome para busca: ", (busca) => {
        const resultado = estudantes.filter(e => e.nome.toLowerCase().includes(busca.toLowerCase()));
        resultado.forEach(({ nome, idade, notas }) => {
            console.log(`${nome} - Idade: ${idade} - Notas: ${notas.join(", ")} - Média: ${calcularMedia(notas).toFixed(2)}`);
        });
        menu();
    });
};
const editarEstudante = () => {
    rl.question("Digite o nome do estudante a ser editado: ", (busca) => {
        const estudante = estudantes.find(e => e.nome.toLowerCase() === busca.toLowerCase());
        if (!estudante) return console.log("Estudante não encontrado.\n"), menu();
        rl.question(`Novo nome (${estudante.nome}): `, (nome) => { if (nome.trim()) estudante.nome = nome; });
        rl.question(`Nova idade (${estudante.idade}): `, (idadeStr) => { const idade = Number(idadeStr); if (!isNaN(idade) && idade > 0) estudante.idade = idade; });
        rl.question(`Novas notas (${estudante.notas.join(", ")}): `, (notasStr) => { const notas = notasStr.split(',').map(Number); if (validarNotas(notas)) estudante.notas = notas; menu(); });
    });
};
const removerEstudante = () => {
    rl.question("Digite o nome do estudante a ser removido: ", (busca) => {
        const index = estudantes.findIndex(e => e.nome.toLowerCase() === busca.toLowerCase());
        if (index === -1) return console.log("Estudante não encontrado.\n");
        estudantes.splice(index, 1);
        console.log("Estudante removido com sucesso!\n");
        menu();
    });
};
const mediaGeral = () => {
    const mediaTotal = estudantes.reduce((acc, { notas }) => acc + calcularMedia(notas), 0) / estudantes.length;
    console.log(`Média geral da turma: ${mediaTotal.toFixed(2)}\n`);
    menu();
};
const maiorMedia = () => {
    const max = estudantes.reduce((prev, curr) => calcularMedia(curr.notas) > calcularMedia(prev.notas) ? curr : prev);
    console.log(`Estudante com maior média: ${max.nome} - Média: ${calcularMedia(max.notas).toFixed(2)}\n`);
    menu();
};
const relatorios = () => {
    const aprovados = estudantes.filter(({ notas }) => calcularMedia(notas) >= 7);
    const recuperacao = estudantes.filter(({ notas }) => { const m = calcularMedia(notas); return m >= 5 && m < 7; });
    const reprovados = estudantes.filter(({ notas }) => calcularMedia(notas) < 5);
    
    console.log("Aprovados:");
    aprovados.forEach(e => console.log(`- ${e.nome} (média: ${calcularMedia(e.notas).toFixed(2)})`));
    console.log("\nRecuperação:");
    recuperacao.forEach(e => console.log(`- ${e.nome} (média: ${calcularMedia(e.notas).toFixed(2)})`));
    console.log("\nReprovados:");
    reprovados.forEach(e => console.log(`- ${e.nome} (média: ${calcularMedia(e.notas).toFixed(2)})`));
    console.log("");  
    menu();
};
const menu = () => {
    console.log("=== MENU ===");
    console.log("1 - Cadastrar estudante");
    console.log("2 - Listar estudantes");
    console.log("3 - Buscar estudante");
    console.log("4 - Editar estudante");
    console.log("5 - Remover estudante");
    console.log("6 - Média geral da turma");
    console.log("7 - Estudante com maior média");
    console.log("8 - Relatórios");
    console.log("0 - Sair");

    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case "1": cadastrarEstudante(); break;
            case "2": listarEstudantes(); break;
            case "3": buscarEstudante(); break;
            case "4": editarEstudante(); break;
            case "5": removerEstudante(); break;
            case "6": mediaGeral(); break;
            case "7": maiorMedia(); break;
            case "8": relatorios(); break;
            case "0": console.log("Saindo..."); rl.close(); break;
            default: console.log("Opção inválida!\n"); menu(); break;
        }
    });
};
menu();