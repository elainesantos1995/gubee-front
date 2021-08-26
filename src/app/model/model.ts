export class Produto{
    id: number;
	nomeProduto: string;
	descricaoSimples: string;
	mercadoAlvo: string;
    tecnologias = new Array<Tecnologia>();
}

export class Tecnologia{
    id: number;
	nome: string;
	versao: string;
}