<?php
// Habilita CORS e credenciais
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Exibe erros durante o desenvolvimento
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "db.php";

// Configuração de cookies
ini_set('session.cookie_secure', '0');
ini_set('session.cookie_samesite', 'Lax');

// Lida com requisições OPTIONS (para CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Captura a URL solicitada
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Processa as rotas da API
if (count($requestUri) >= 2 && $requestUri[0] === 'api') {
    array_shift($requestUri);

    if ($requestUri[0] === 'users') {
        require_once __DIR__ . '/routes/users.php';
    } elseif ($requestUri[0] === 'tasks') {
        require_once __DIR__ . '/routes/tasks.php';
    } elseif ($requestUri[0] === 'login') {
        require_once __DIR__ . '/routes/login.php';
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Endpoint não encontrado']);
    }
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint não encontrado']);
}
