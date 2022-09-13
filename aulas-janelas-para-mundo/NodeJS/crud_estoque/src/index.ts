import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';

import categoriaRoutes from './routes/categorias.route';
import clientesRoutes from './routes/clientes.route';
import vendedoresRoutes from './routes/vendedores.route';
import pagamentosRoutes from './routes/pagamentos.route';
import produtosRoutes from './routes/produtos.route';
import vendasRoutes from './routes/vendas.route';
import fornecedoresRoutes from './routes/fornecedores.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(statusRoute);
app.use(clientesRoutes);
app.use(produtosRoutes);
app.use(categoriaRoutes);
app.use(vendedoresRoutes);
app.use(pagamentosRoutes);
app.use(vendasRoutes);
app.use(fornecedoresRoutes);

// Configuração dos Handlers de Erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000!');
});
