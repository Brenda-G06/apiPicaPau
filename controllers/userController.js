const pool = require('../config/db');

// Cadastrar usuário OK
exports.registerUser = async (req, res) => {
    const { nome, email, senha, categoria } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (nome, email, senha, categoria) VALUES (?, ?, ?, ?)',
        [nome, email, senha, categoria]
      );
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);  // Log detalhado
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  };
  

// Login OK
exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);
    if (rows.length) {
      res.status(200).json({ message: 'Login bem-sucedido!', user: rows[0] });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};

// Listar usuários
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params; // ID do usuário para atualizar
  const { nome, email, categoria } = req.body; // Dados que serão atualizados

  try {
    // Verificando se o usuário existe
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Atualizando o usuário
    await pool.query(
      'UPDATE usuarios SET nome = ?, email = ?, categoria = ? WHERE id = ?',
      [nome, email, categoria, id]
    );

    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.error(error); // Imprime o erro no console para diagnóstico
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      // Remover avaliações onde o usuário é líder ou funcionário
      await pool.query('DELETE FROM avaliacoes WHERE id_lider = ? OR id_funcionario = ?', [id, id]);
  
      // Agora, excluir o usuário
      const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
  };
  
  
  
