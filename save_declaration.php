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

// 本地文件路径
$filePath = 'declarations.txt';

// 构建要追加的内容
$newEntry = "=== 宣言 ===\n";
$newEntry .= "时间: " . date('Y-m-d H:i:s') . "\n";
$newEntry .= "姓名: " . $name . "\n";
$newEntry .= "内容: " . $text . "\n";
$newEntry .= "====================\n\n";

// 尝试追加内容到文件
try {
    // 使用文件追加模式打开文件
    $fileHandle = fopen($filePath, 'a');
    
    if ($fileHandle === false) {
        throw new Exception('无法打开文件进行写入');
    }
    
    // 写入内容
    $writeResult = fwrite($fileHandle, $newEntry);
    
    // 关闭文件
    fclose($fileHandle);
    
    if ($writeResult === false) {
        throw new Exception('写入文件失败');
    }
    
    echo json_encode([
        'success' => true, 
        'message' => '宣言已成功保存到本地文件'
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'message' => '保存失败: ' . $e->getMessage()
    ]);
}
?>
