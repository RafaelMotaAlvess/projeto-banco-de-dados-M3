import { database } from './db'

export async function createTables() {
  const createTableCmds = [
    `
    CREATE TABLE IF NOT EXISTS Fornecedor (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nome VARCHAR(50)
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS ContatoFornecedor (
      id INT PRIMARY KEY AUTO_INCREMENT,
      info VARCHAR(30),
      tipo VARCHAR(20),
      id_fornecedor INT,
      FOREIGN KEY (id_fornecedor) REFERENCES Fornecedor (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS EnderecoFornecedor (
      id INT PRIMARY KEY AUTO_INCREMENT,
      bairro VARCHAR(50),
      rua VARCHAR(50),
      cep VARCHAR(8),
      cidade VARCHAR(50),
      estado VARCHAR(50),
      numero VARCHAR(6),
      id_fornecedor INT,
      FOREIGN KEY (id_fornecedor) REFERENCES Fornecedor (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Cliente (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nome VARCHAR(50),
      email VARCHAR(50),
      senha VARCHAR(50),
      data_criacao DATE,
      data_atualizacao DATE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS ContatoCliente (
      id INT PRIMARY KEY AUTO_INCREMENT,
      info VARCHAR(30),
      tipo VARCHAR(20),
      id_cliente INT,
      FOREIGN KEY (id_cliente) REFERENCES Cliente (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS EnderecoCliente (
      id INT PRIMARY KEY AUTO_INCREMENT,
      bairro VARCHAR(50),
      rua VARCHAR(50),
      cep INT,
      cidade VARCHAR(50),
      estado VARCHAR(50),
      numero INT,
      id_cliente INT,
      FOREIGN KEY (id_cliente) REFERENCES Cliente (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Categoria (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nome VARCHAR(50)
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Produto (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nome VARCHAR(50),
      descricao VARCHAR(500),
      preco FLOAT(12),
      quantidade_estoque INT,
      id_categoria INT,
      id_fornecedor INT,
      FOREIGN KEY (id_fornecedor) REFERENCES Fornecedor (id) ON DELETE CASCADE,
      FOREIGN KEY (id_categoria) REFERENCES Categoria (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Pedido (
      id INT PRIMARY KEY AUTO_INCREMENT,
      data DATE,
      metodo_compra VARCHAR(20),
      total_pedido FLOAT(12),
      id_cliente INT,
      FOREIGN KEY (id_cliente) REFERENCES Cliente (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Detalhes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      quantidade_produto INT,
      preco_unitario FLOAT,
      subtotal FLOAT,
      id_pedido INT,
      id_produto INT,
      FOREIGN KEY (id_pedido) REFERENCES Pedido (id) ON DELETE CASCADE,
      FOREIGN KEY (id_produto) REFERENCES Produto (id) ON DELETE CASCADE
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS Status (
      id INT PRIMARY KEY AUTO_INCREMENT,
      descricao VARCHAR(255),
      data_atualizacao DATE,
      observacoes VARCHAR(100),
      id_pedido INT,
      FOREIGN KEY (id_pedido) REFERENCES Pedido (id) ON DELETE CASCADE
    );
    `
  ];

  createTableCmds.forEach((command) => {
    database.query(command, (err, result) => {
      if (err) {
        console.error('Erro ao criar tabela: ' + err.message);
        return;
      }
      console.log('Tabela criada com sucesso!');
    });
  });

  console.log('Tables created successfully!');
}
