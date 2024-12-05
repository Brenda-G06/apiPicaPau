const pool = require('../config/db');

class Team {
  static async create({ nome_equipe, id_lider }) {
    const [result] = await pool.query(
      'INSERT INTO equipes (nome_equipe, id_lider) VALUES (?, ?)',
      [nome_equipe, id_lider]
    );
    return result.insertId;
  }

  static async addMember(id_funcionario, id_equipe) {
    await pool.query(
        'INSERT INTO equipe_funcionarios (id_equipe, id_funcionario) VALUES (?, ?)',
        [id_equipe, id_funcionario]
    );
}

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM equipes WHERE id = ?', [id]);
    return rows[0];
  }

 /*/ static async delete(id) {
    const query = 'DELETE FROM equipes WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
}*/

  static async update(id, { nome_equipe }) {
    await pool.query(
      'UPDATE equipes SET nome_equipe = ? WHERE id = ?',
      [nome_equipe, id]
    );
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM equipes');
    return rows;
  }

}

module.exports = Team;
