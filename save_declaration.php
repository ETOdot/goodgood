<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// 检查是否是POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => '无效的请求方法']);
    exit;
}

// 获取POST数据
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$text = isset($_POST['text']) ? trim($_POST['text']) : '';

// 验证数据
if (empty($name) || empty($text)) {
    echo json_encode(['success' => false, 'message' => '姓名和宣言内容不能为空']);
    exit;
}

// 过滤和清理数据（安全措施）
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');

// 创建数据目录（如果不存在）
$dataDir = 'data';
if (!is_dir($dataDir)) {
    if (!mkdir($dataDir, 0755, true)) {
        echo json_encode(['success' => false, 'message' => '无法创建数据目录']);
        exit;
    }
}

// 设置文件路径
$filename = $dataDir . '/declarations.txt';

// 准备要保存的数据
$data = "=== 宣言 ===\n";
$data .= "时间: " . date('Y-m-d H:i:s') . "\n";
$data .= "姓名: " . $name . "\n";
$data .= "内容: " . $text . "\n";
$data .= "====================\n\n";

// 尝试写入文件
if (file_put_contents($filename, $data, FILE_APPEND | LOCK_EX) !== false) {
    echo json_encode(['success' => true, 'message' => '宣言已成功保存']);
} else {
    echo json_encode(['success' => false, 'message' => '无法保存到文件，请检查文件权限']);
}
?>
