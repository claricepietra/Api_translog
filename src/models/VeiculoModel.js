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

    static async cadastrar(veiculo) {

        const sql = `INSERT INTO tb_veiculos (cd_placa, nm_modelo, ds_categoria, vl_diaria_frete, qt_quilometragem)VALUES (?, ?, ?, ?, ?)`;

        //Monta o array de valores na mesma ordem de colunas acima 
        const valores = [
            veiculo.cd_placa,
            veiculo.nm_modelo,
            veiculo.ds_categoria,
            veiculo.vl_diaria_frete,
            veiculo.qt_quilometragem ?? 0
        ];

        const [resultado] = await pool.query(sql, valores);

        return {
            id_veiculo: resultado.insertId,
            cd_placa: veiculo.cd_placa,
            nm_modelo: veiculo.nm_modelo,
            ds_categoria: veiculo.ds_categoria,
            vl_diaria_frete: veiculo.vl_diaria_frete,
            qt_quilometragem: veiculo.qt_quilometragem ?? 0
        };
    }

}

module.exports = VeiculoModel;