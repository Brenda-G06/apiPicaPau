const pool = require('../config/db');

class Candidate {
  static async create({ nome, cargo_pretendido, link }) {
    const [result] = await pool.query(
      'INSERT INTO candidato (nome, cargo_pretendido, link) VALUES (?, ?, ?)',
      [nome, cargo_pretendido, link]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM candidato');
    return rows;
  }

  static async delete(id) {
    await pool.query('DELETE FROM candidato WHERE id = ?', [id]);
  }
}

module.exports = Candidate;
