const pool = require('../config/db');

class User {
  static async create({ nome, email, senha, categoria }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, categoria) VALUES (?, ?, ?, ?)',
      [nome, email, senha, categoria]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { nome, email, categoria }) {
    await pool.query(
      'UPDATE usuarios SET nome = ?, email = ?, categoria = ? WHERE id = ?',
      [nome, email, categoria, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
  }
}

module.exports = User;
