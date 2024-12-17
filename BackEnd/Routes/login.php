<?php

// Inicia a sessão se ainda não tiver sido iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verifica se o método da requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido. Use POST.']);
    exit();
}

// Inclui a conexão com o banco de dados
require_once __DIR__ . '/../db.php';

// Conecta ao banco de dados
$db = connectDb();

// Lê os dados enviados na requisição
$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// Verifica se os campos estão preenchidos
if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Usuário e senha são obrigatórios.']);
    exit();
}

try {
    // Consulta o usuário no banco de dados
    $query = $db->prepare('SELECT * FROM users WHERE username = :username');
    $query->bindParam(':username', $username);
    $query->execute();
    $user = $query->fetch(PDO::FETCH_ASSOC);

    // Verifica as credenciais
    if ($user && password_verify($password, $user['password'])) {
        http_response_code(200);
        echo json_encode([
            'message' => 'Login realizado com sucesso.',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username']
            ],
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Usuário ou senha inválidos.']);
    }
} catch (Exception $e) {
    // Loga o erro e retorna uma resposta genérica para o cliente
    error_log('Erro no login: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno no servidor.']);
}
