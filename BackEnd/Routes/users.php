<?php
$pdo = connectDb();

// Verifica o método da requisição e a URL para determinar a ação a ser executada

// Verifica se a requisição é GET e não há parâmetros adicionais na URL
if ($requestMethod === 'GET' && count($requestUri) === 1) {
    // Lista todos os usuários
    $stmt = $pdo->query("SELECT * FROM users");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} elseif ($requestMethod === 'GET' && isset($requestUri[1])) {
    // Verifica se a requisição é GET e se há um ID de usuário na URL para pegar um usuário específico
    $id = intval($requestUri[1]);
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));

} elseif ($requestMethod === 'POST') {
    // Verifica se a requisição é POST para criar um novo usuário
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verifica se o campo 'username' foi enviado
    if (empty($data['username']) || empty($data['password'])) {
        echo json_encode(['error' => 'Username and password are required']);
        http_response_code(400);
        exit;
    }

    // Prepara a consulta para verificar se o usuário já existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$data['username']]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        // Retorna mensagem de erro caso o usuário já exista
        echo json_encode(['error' => 'Username already exists']);
        http_response_code(409); // Código de resposta HTTP para conflito
    } else {
        // Insere um novo usuário no banco
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute([$data['username'], password_hash($data['password'], PASSWORD_BCRYPT)]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        http_response_code(201); // Código de resposta HTTP para recurso criado
    }

} elseif ($requestMethod === 'PUT' && isset($requestUri[1])) {
    // Verifica se a requisição é PUT e se há um ID de usuário na URL para atualizar um usuário
    $id = intval($requestUri[1]);
    $data = json_decode(file_get_contents('php://input'), true);
    // Prepara a consulta para atualizar o usuário com o ID fornecido
    $stmt = $pdo->prepare("UPDATE users SET username = ?, password = ? WHERE id = ?");
    $stmt->execute([$data['username'], password_hash($data['password'], PASSWORD_BCRYPT), $id]);
    // Retorna uma mensagem indicando que o usuário foi atualizado
    echo json_encode(['message' => 'User updated']);

} elseif ($requestMethod === 'DELETE' && isset($requestUri[1])) {
    // Verifica se a requisição é DELETE e se há um ID de usuário na URL para excluir um usuário
    $id = intval($requestUri[1]);
    // Prepara a consulta para excluir o usuário com o ID fornecido
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);
    // Retorna uma mensagem indicando que o usuário foi excluído
    echo json_encode(['message' => 'User deleted']);
}
