const Team = require('../models/teamModel');

// Criar equipe
exports.createTeam = async (req, res) => {
  const { nome_equipe, id_lider } = req.body;
  console.log("Dados recebidos:", { nome_equipe, id_lider });
  try {
    const id = await Team.create({ nome_equipe, id_lider });
    console.log("Equipe criada com ID:", id);
    res.status(201).json({ message: 'Equipe criada com sucesso!', id });
  } catch (error) {
    console.error("Erro ao criar equipe:", error);
    res.status(500).json({ error: 'Erro ao criar equipe.' });
  }
};


// Adicionar membro à equipe
exports.addMemberToTeam = async (req, res) => {
  const { id_funcionario, id_equipe } = req.body;
  try {
    await Team.addMember(id_funcionario, id_equipe);
    res.status(200).json({ message: 'Membro adicionado à equipe com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar membro à equipe:', error);
    res.status(500).json({ error: 'Erro ao adicionar membro à equipe.' });
  }
};


// Listar equipes
exports.getAllTeams = async (req, res) => {
  try {
      console.log('Buscando equipes...');
      const teams = await Team.findAll();
      console.log('Equipes encontradas:', teams);
      res.status(200).json(teams);
  } catch (error) {
      console.error('Erro ao listar equipes:', error);
      res.status(500).json({ error: 'Erro ao buscar equipes.' });
  }
};


// Atualizar equipe
exports.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { nome_equipe } = req.body;
  try {
    await Team.update(id, { nome_equipe });
    res.status(200).json({ message: 'Equipe atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar equipe.' });
  }
};

/*// Excluir equipe
exports.deleteTeam = async (req, res) => {
  const { id } = req.params;
  console.log('Tentando excluir a equipe com ID:', id);

  try {
      const result = await Team.delete(id);
      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Equipe excluída com sucesso.' });
      } else {
          res.status(404).json({ error: 'Equipe não encontrada.' });
      }
  } catch (error) {
      console.error('Erro ao excluir equipe:', error);
      res.status(500).json({ error: 'Erro ao excluir equipe.' });
  }
};
*/
