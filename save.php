<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Verifica si se han enviado datos mediante POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene el nombre del archivo y el contenido del POST
    $filename = $_POST['filename'];
    $content = $_POST['content'];

    echo (realpath ($filename));
    chmod($filename , 0777);
    // Guarda el contenido en el archivo
    $result = file_put_contents($filename, $content);
    
    // Responde con un mensaje de éxito
    if ($result) echo "Guardado exitosamente en $filename";
    else echo "Error al guardar el archivo";
    
} else {
    // Si no se han enviado datos mediante POST, responde con un error
    http_response_code(405);
    echo "Método no permitido";
}
?>
