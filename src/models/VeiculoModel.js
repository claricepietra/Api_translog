const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnetion: true,
    connetionLimit: 10,
    queueLimit: 0
});

class VeiculoModel {

    static async listarTodos(ds_categoria) {
        if (ds_categoria) {
            const [rows] = await pool.query(
                'SELECT * FROM tb_veiculos WHERE ds_categoria = ? ORDER BY id_veiculo DESC',
                [ds_categoria]
            );
            return rows;
        }
        const [rows] = await pool.query('SELECT * FROM tb_veiculos');
        return rows;
    }

    static async buscarPorId(id_veiculo) {
        const [rows] = await pool.query(
            'SELECT * FROM tb_veiculos WHERE id_veiculos = ?',
            [id_veiculo]
        );
        return rows[0] || null;
    }

}

module.exports = VeiculoModel;