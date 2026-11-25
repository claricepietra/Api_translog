-- Criação do banco de dados da transportadora com o mnemônico db_
CREATE DATABASE IF NOT EXISTS db_translog;

-- Seleção do banco para execução dos comandos
USE db_translog;

-- Criação da tabela de veículos com o mnemônico tb_ e prefixos padronizados nas colunas
CREATE TABLE IF NOT EXISTS tb_veiculos (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    cd_placa VARCHAR(10) NOT NULL UNIQUE,
    nm_modelo VARCHAR(80) NOT NULL,
    ds_categoria VARCHAR(40) NOT NULL,
    vl_diaria_frete DECIMAL(10, 2) NOT NULL,
    qt_quilometragem INT NOT NULL DEFAULT 0
);

-- Inserção dos registros iniciais para viabilizar os testes da Sprint 1 (Método GET)
INSERT INTO tb_veiculos (cd_placa, nm_modelo, ds_categoria, vl_diaria_frete, qt_quilometragem) VALUES
('ABC-1D23', 'Volvo FH 540', 'Pesado', 1450.00, 128500),
('XYZ-9K88', 'Mercedes-Benz Accelo 1016', 'VUC', 680.50, 45200),
('JKL-4M55', 'Volkswagen Delivery 11.180', 'Semipesado', 890.00, 73100),
('QWE-7R11', 'Fiat Fiorino Endurance', 'Utilitario', 320.00, 19400);