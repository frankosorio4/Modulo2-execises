-- Criar um arquivo SQL com os seguintes procedimentos:

-- Função Agregada: Encontre a média de idade dos clientes que têm pedidos com valor total superior a 300,00.

select avg(c.idade)
	from clientes c
	inner join pedidos pd
		on (c.cliente_id = pd.cliente_id) and 
			pd.valor > 300

-- select c.nome, c.idade, pd.valor 
-- 	from clientes c
-- 	inner join pedidos pd
-- 		on (c.cliente_id = pd.cliente_id) and 
-- 			pd.valor > 300

-- Subconsulta: Liste todos os produtos que foram pedidos mais de uma vez.

select ip.produto_id, pr.nome_produto
	from itens_pedidos ip
	inner join produtos pr
		on ip.produto_id = pr.produto_id
 	group by ip.produto_id, pr.nome_produto
having count(ip.produto_id) > 1