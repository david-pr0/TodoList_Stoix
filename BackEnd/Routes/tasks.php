<?php
$pdo = connectDb();

// Verifica o método da requisição e a URL para determinar a ação a ser executada

// Verifica se a requisição é GET e se há um ID de usuário na URL
if ($requestMethod === 'GET' && isset($requestUri[1])) {
    // Lista todas as tarefas de um usuário específico
    $userId = intval($requestUri[1]);
    $stmt = $pdo->prepare("SELECT * FROM tasks WHERE user_id = ?");
    $stmt->execute([$userId]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} elseif ($requestMethod === 'POST' && isset($requestUri[1])) {
    // Verifica se a requisição é POST e se há um ID de usuário na URL para criar uma nova tarefa
    $userId = intval($requestUri[1]);
    // Decodifica os dados JSON enviados no corpo da requisição
    $data = json_decode(file_get_contents('php://input'), true);
    // Prepara a consulta para inserir uma nova tarefa associada ao usuário
    $stmt = $pdo->prepare("INSERT INTO tasks (user_id, description) VALUES (?, ?)");
    // Executa a consulta, passando o ID do usuário e a descrição da tarefa
    $stmt->execute([$userId, $data['description']]);
    // Retorna o ID da nova tarefa criada
    echo json_encode(['id' => $pdo->lastInsertId()]);

} elseif ($requestMethod === 'PUT' && isset($requestUri[1])) {
    // Verifica se a requisição é PUT e se há um ID de tarefa na URL para atualizar uma tarefa
    $taskId = intval($requestUri[1]);
    // Decodifica os dados JSON enviados no corpo da requisição
    $data = json_decode(file_get_contents('php://input'), true);
    // Prepara a consulta para atualizar a tarefa com o ID fornecido
    $stmt = $pdo->prepare("UPDATE tasks SET description = ?, status = ? WHERE id = ?");
    // Executa a consulta, passando os novos dados da tarefa
    $stmt->execute([$data['description'], $data['status'], $taskId]);
    // Retorna uma mensagem indicando que a tarefa foi atualizada
    echo json_encode(['message' => 'Task updated']);

} elseif ($requestMethod === 'DELETE' && isset($requestUri[1])) {
    // Verifica se a requisição é DELETE e se há um ID de tarefa na URL para excluir uma tarefa
    $taskId = intval($requestUri[1]);

    // Verifica se a tarefa com o ID fornecido existe
    $stmt = $pdo->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->execute([$taskId]);
    $task = $stmt->fetch();

    if ($task) {
        // Se a tarefa existir, procede com a exclusão
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$taskId]);
        echo json_encode(['message' => 'Task deleted']);
    } else {
        // Se a tarefa não existir, retorna um erro 404
        echo json_encode(['message' => 'Task not found'], JSON_PRETTY_PRINT);
    }
}
