-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS todolist_stoix;
USE todolist_stoix;

-- Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tarefas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Dados de Exemplo
-- Insira usuários de exemplo
INSERT INTO users (username, password) VALUES
('admin', '$2y$10$eImiTXuWVxfM37uY4JANjQ=='), -- Senha: admin (use bcrypt para senhas reais)
('david', '$2y$10$eImiTXuWVxfM37uY4JANjQ=='); -- Senha: 123456

-- Insira tarefas de exemplo
INSERT INTO tasks (user_id, description, status) VALUES
(1, 'Tarefa de exemplo para admin', 'pending'),
(2, 'Tarefa de exemplo para david', 'completed');
