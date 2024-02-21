const mysqlConnection = require('../database/mysqlConnection'); // Importa o objeto de conexão
const AppError = require("../utils/AppError");

class UserController {
    async getUser(request, response) {
        try {
            // Utiliza o objeto de conexão diretamente
            const [users] = await mysqlConnection.execute("SELECT * FROM fornecedor.fornecedores");
    
            return response.status(200).json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async createUser(request, response) {
        try {
            const { name, email, number, typeFornecedor, message } = request.body;
            
            // Utiliza o objeto de conexão diretamente
            await mysqlConnection.execute("INSERT INTO fornecedor.fornecedores (name, email, number, typeFornecedor, message) VALUES (?, ?, ?, ?, ?)",
             [ name, 
               email,
               number,
               typeFornecedor,
               message 
            ]);

            return response.status(200).json("Usuário criado com sucesso.");
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async updateUser(request, response) {
        try {
            const { name, email, number, typeFornecedor, message } = request.body;
            
            const userId = request.params.id;
    
            // Utiliza o objeto de conexão diretamente
            const result = await mysqlConnection.execute("UPDATE fornecedor.fornecedores SET `name` = ?, `email` = ?, `number` = ?, `typeFornecedor` = ?, `message` = ? WHERE `id` = ?",
              [name, email, number, typeFornecedor, message, userId]);
    
            return response.status(200).json("Usuário atualizado com sucesso.");
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async deleteUser(request, response) {
        try {
            const userId = request.params.id;
    
            // Utiliza o objeto de conexão diretamente
            const result = await mysqlConnection.execute("DELETE FROM fornecedor.fornecedores WHERE id = ?", [userId]);
    
            // Verifica se houve alguma linha afetada pela exclusão
            if (result[0].affectedRows === 0) {
                throw new AppError("Usuário não encontrado.");
            }
    
            return response.status(200).json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

module.exports = UserController;
