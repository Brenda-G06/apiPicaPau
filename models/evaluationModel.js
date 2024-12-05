const pool = require('../config/db');

class Evaluation {
  static async create({ id_lider, id_funcionario, nota, comentario }) {
    const [result] = await pool.query(
      'INSERT INTO avaliacoes (id_lider, id_funcionario, nota, comentario, data_avaliacao) VALUES (?, ?, ?, ?, NOW())',
      [id_lider, id_funcionario, nota, comentario]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM avaliacoes');
    return rows;
  }
}

module.exports = Evaluation;
