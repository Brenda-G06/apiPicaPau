const pool = require('../config/db');

exports.getAllCandidates = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM candidato');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar candidatos.' });
  }
};

exports.addCandidate = async (req, res) => {
  const { nome, cargo_pretendido, link } = req.body;
  try {
    await pool.query('INSERT INTO candidato (nome, cargo_pretendido, link) VALUES (?, ?, ?)', [nome, cargo_pretendido, link]);
    res.status(201).json({ message: 'Candidato adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar candidato.' });
  }
};

exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM candidato WHERE id = ?', [id]);
    res.status(200).json({ message: 'Candidato excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir candidato.' });
  }
};
exports.hireCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const [candidate] = await pool.query('SELECT * FROM candidato WHERE id = ?', [id]);

    if (!candidate.length) {
      return res.status(404).json({ error: 'Candidato não encontrado.' });
    }

    const { nome, cargo_pretendido, link } = candidate[0];

    await Candidate.hire({ nome, cargo: cargo_pretendido, link });
    await Candidate.delete(id);

    res.status(200).json({ message: 'Candidato contratado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao contratar candidato.' });
  }
};