//Dado um array de objetos representando produtos com propriedades categoria e preco, crie uma função que agrupe os produtos por categoria e calcule o preço total de cada categoria.

function agruparPorCategoria(produtos) {

    let categorias = produtos.map(producto => producto.categoria)

    categoriasUnicas = [...new Set(categorias)];

    let totaisPorCategoria = categoriasUnicas.reduce( (sumCategoriasObj,categoriaUnica) =>{

        let arrayPrecosCategoria = produtos.filter( (produto) =>{
            return produto.categoria === categoriaUnica
        })

        let sumaPrecoCategoria = arrayPrecosCategoria.reduce((tot,item) =>{
            return tot + item.preco;
        },0)

        sumCategoriasObj[categoriaUnica] = sumaPrecoCategoria;

        return sumCategoriasObj;
    },{})
    
    return totaisPorCategoria
}

let produtos = [
{ categoria: 'eletronicos', preco: 99.99 },
{ categoria: 'livros', preco: 19.99 },
{ categoria: 'eletronicos', preco: 199.99 },
{ categoria: 'livros', preco: 29.99 },
{ categoria: 'roupas', preco: 49.99 }
];

console.log(agruparPorCategoria(produtos));

/*
{
eletrônicos: 299.98,
livros: 49.98,
roupas: 49.99
}
*/