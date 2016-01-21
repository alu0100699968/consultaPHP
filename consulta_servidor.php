<?php
//Connect To Database
$hostname='mysql.hostinger.es';
$username='u376796709_aluuu';
$password='123456';
$dbname='u376796709_store';
$usertable='Tiendas';
$yourid = 1;

header('Content-type: text/html; charset=UTF-8');

function connect() {
	global $hostname, $username, $password, $dbname;
	$con = mysqli_connect($hostname, $username, $password, $dbname) OR DIE ('Imposible conectar a la BD, hermano.');

	return $con;
}

function disconnect($con) {
	$close = mysqli_close($con) OR DIE ('Ha sucedido un error inesperado, mi niño');

	return $close;
}

function getInfoID($id, $sitio) {
	global $usertable;

	$conexion = connect();

	mysqli_set_charset($conexion, "utf8");


	$query = 'SELECT * FROM ' . $usertable . ' WHERE Nombre = "' . $id . '" AND Provincia = "' . $sitio . '"';
	$result = mysqli_query($conexion, $query);

	if($result) {
		$rawdata = array();
		$i = 0;
		while($row = mysqli_fetch_array($result))
		{
			for ($x=0; $x<count($row); $x++) {
				unset($row[$x]);
			}
			$rawdata[$i] = $row;
			$i++;
		}
	}
	else {
		print "Base de Datos NO encontrada.";
	}

	disconnect($conexion);
	return $rawdata;
}

if (isset($_POST['action'])) {
    echo json_encode(getInfoID($_POST['action'], $_POST['action2']), JSON_UNESCAPED_UNICODE);
}
?>
