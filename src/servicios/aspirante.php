<?php

include "library/config.php";

$postjson = json_decode(file_get_contents("php://input"), true);

$strcampos =   "asp_id,asp_cedula,asp_codigo,asp_nombres,asp_apellidop,asp_apellidom," .
	"asp_pais,asp_sexo,asp_edad,asp_correo,asp_ecivil,asp_gpo_sanguineo," .
	"asp_cargo,asp_sueldo,asp_conadis,asp_nro_conadis,asp_discapacidad," .
	"asp_porcentaje,asp_experiencia,asp_nmb_experiencia,asp_ing_entrevista," .
	"asp_fch_ingreso,asp_telefono,asp_direccion,asp_hora_entrevista," .
	"asp_referencia,asp_estado,asp_observaciones,asp_observacion_medico," .
	"asp_observacion_final,asp_academico,asp_fecha_nacimiento,asp_militar," .
	"asp_aprobacion,asp_evaluacion,asp_condicion,asp_lugar_nacimiento," .
	"asp_etnia,asp_religion,asp_banco,asp_nro_cuenta,asp_nombre_familiar," .
	"asp_parentezco_familiar,asp_telefono_familiar,asp_descripcion_vivienda," .
	"asp_referencia_vivienda,asp_cargas,asp_cargas_primaria,asp_cargas_secundaria," .
	"asp_vivienda,asp_construccion,asp_movilizacion,asp_recomendado,est_descripcion";

if ($postjson['task'] == 'nuevo') {

	$strObjeto = "";

	foreach ($postjson as $key => $value) {

		if (substr($key, 0, 4) == "asp_") {
			$strObjeto = $strObjeto . $key . " = '" . (string)$value . "',\n";
		}
	}

	$strObjeto = substr($strObjeto, 0, strlen($strObjeto) - 2);

	$query = mysqli_query($mysqli, "INSERT INTO aspirante SET " . $strObjeto);

	$mysqli->close();

	if ($query) {
		$result = json_encode(array('success' => true, 'sql' => 'Listo!'));
	} else {
		$result = json_encode(array('success' => false, 'sql' => 'Error'));
	}
	echo $result;
} elseif ($postjson['task'] == 'obtener') {
	$data = array();
	$query = mysqli_query($mysqli, "SELECT * FROM aspirante 
						INNER JOIN estados
		                ON estados.est_nombre LIKE aspirante.asp_estado
	                WHERE aspirante.asp_cedula LIKE '%$postjson[texto]%' 
					ORDER BY asp_fch_ingreso DESC
									");

	while ($row = mysqli_fetch_array($query)) {
		$data[] = llenarArray($row, $strcampos);
	}

	$mysqli->close();
	if ($query) $result = json_encode(array('success' => true, 'result' => $data));
	else $result = json_encode(array('success' => false));
	echo $result;
} else if ($postjson['task'] == 'actualizar') {

	$strObjeto = "";

	foreach ($postjson as $key => $value) {

		if (substr($key, 0, 4) == "asp_" && trim($key) != "asp_id") {
			$strObjeto = $strObjeto . $key . " = '" . (string)$value . "',\n";
		}
	}

	$strObjeto = substr($strObjeto, 0, strlen($strObjeto) - 2);

	$query = mysqli_query($mysqli, "UPDATE aspirante SET " . $strObjeto .
		"WHERE asp_cedula LIKE '$postjson[asp_cedula]'");

	$mysqli->close();

	if ($query) {
		$result = json_encode(array('success' => true));
	} else {
		$result = json_encode(array('success' => false));
	}
	echo $result;
} else if ($postjson['task'] == 'buscar') {

	$data = array();
	//$query = mysqli_query($mysqli, "SELECT * FROM esmeraldas ORDER BY id LIMIT $postjson[start],$postjson[limit]");
	$query = mysqli_query($mysqli, "SELECT asp_codigo,asp_cedula,asp_nombres,asp_apellidop,asp_apellidom,
	asp_cargo,asp_fch_ingreso,asp_telefono,asp_estado,asp_recomendado,asp_observaciones, 
	est_descripcion

	FROM aspirante 
	INNER JOIN estados
		ON estados.est_nombre LIKE aspirante.asp_estado
		
	WHERE 
		asp_nombres LIKE '%$postjson[texto]%' OR 
		asp_apellidop LIKE '%$postjson[texto]%' OR 
		asp_apellidom LIKE '%$postjson[texto]%' OR 
		asp_cedula LIKE '%$postjson[texto]%' OR 
		asp_codigo LIKE '%$postjson[texto]%' 
		ORDER BY asp_fch_ingreso DESC");

	while ($row = mysqli_fetch_array($query)) {

		$data[] = array(

			'asp_codigo' => $row['asp_codigo'],
			'asp_cedula' => $row['asp_cedula'],
			'asp_nombres' => $row['asp_nombres'],
			'asp_apellidop' => $row['asp_apellidop'],
			'asp_apellidom' => $row['asp_apellidom'],
			'asp_cargo' => $row['asp_cargo'],
			'asp_fch_ingreso' => $row['asp_fch_ingreso'],
			'asp_telefono' => $row['asp_telefono'],
			'asp_estado' => $row['asp_estado'],
			'asp_recomendado' => $row['asp_recomendado'],
			'asp_observaciones' => $row['asp_observaciones'],
			'est_descripcion' => $row['est_descripcion']

		);
	}
	$mysqli->close();

	if ($query)
		$result = json_encode(array('success' => true, 'result' => $data));
	else
		$result = json_encode(array('success' => false));
	echo $result;
} else if ($postjson['task'] == 'listarporestado') {

	$data = array();

	$strcampos = "asp_codigo,asp_cedula,asp_nombres,asp_apellidop,asp_apellidom," .
		"asp_cargo,asp_fch_ingreso,asp_telefono,asp_estado,asp_recomendado,asp_observaciones," .
		"est_descripcion";

	$consulta = (string)"SELECT " . $strcampos . " FROM aspirante 
	                INNER JOIN estados
		                ON estados.est_nombre LIKE aspirante.asp_estado
	                WHERE estados.est_id > $postjson[id_estado]
					ORDER BY asp_fch_ingreso DESC";

	$query = mysqli_query($mysqli, $consulta);



	while ($row = mysqli_fetch_array($query)) {


		$data[] = array(

			'asp_codigo' => $row['asp_codigo'],
			'asp_cedula' => $row['asp_cedula'],
			'asp_nombres' => $row['asp_nombres'],
			'asp_apellidop' => $row['asp_apellidop'],
			'asp_apellidom' => $row['asp_apellidom'],
			'asp_cargo' => $row['asp_cargo'],
			'asp_fch_ingreso' => $row['asp_fch_ingreso'],
			'asp_telefono' => $row['asp_telefono'],
			'asp_estado' => $row['asp_estado'],
			'asp_recomendado' => $row['asp_recomendado'],
			'asp_observaciones' => $row['asp_observaciones'],
			'est_descripcion' => $row['est_descripcion']

		);
	}
	$mysqli->close();

	if ($query)
		$result = json_encode(array('success' => true, 'result' => $data));
	else
		$result = json_encode(array('success' => false));
	echo $result;
}

function llenarArray(array $aspirante, string $strlista)
{
	$listacampos =  (explode(",", $strlista));

	$strObjeto = "{";

	foreach ($listacampos as $campo) {

		$strObjeto = $strObjeto . '"' . $campo . '"' . ' : "' . trim($aspirante[$campo]) . '",';
	}

	$strObjeto = substr($strObjeto, 0, strlen($strObjeto) - 1);
	$strObjeto = $strObjeto . "}";

	$resJson = json_decode($strObjeto);
	return $resJson;
}
