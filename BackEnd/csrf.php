<?php

function generateCsrfToken() {
    return bin2hex(random_bytes(32));
}

function getCsrfToken() {
    if (!isset($_SESSION['csrf_token']) || 
        !isset($_SESSION['csrf_token_time']) || 
        (time() - $_SESSION['csrf_token_time']) > 1800) {
        $_SESSION['csrf_token'] = generateCsrfToken();
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

function validateCsrfToken($token) {
    if (empty($token) || 
        !isset($_SESSION['csrf_token']) || 
        $token !== $_SESSION['csrf_token'] || 
        (time() - $_SESSION['csrf_token_time']) > 1800) {
        http_response_code(403);
        echo json_encode(['error' => 'CSRF token inválido ou expirado']);
        exit;
    }
}
