<?php

include "library/config.php";

$postjson = json_decode(file_get_contents("php://input"), true);


if ($postjson['task'] == 'getaspiranterol') {

	$data = array();

	if ($postjson['role'] == 'tthh') {
		$query = mysqli_query($mysqli, "SELECT DISTINCT * FROM vista_asp_tthh 
						WHERE asp_cedula LIKE '$postjson[cedula]'");
	}

	if ($postjson['role'] == 'psico') {
		$query = mysqli_query($mysqli, "SELECT DISTINCT * FROM vista_asp_psico 
						WHERE asp_cedula LIKE '$postjson[cedula]'");
	}

	while ($row = mysqli_fetch_array($query)) {

		$keys = array_filter(array_keys($row), "is_numeric");
		$out = array_diff_key($row, array_flip($keys));

		$data[] = $out;
	}

	$mysqli->close();

	if ($query) {
		$result = json_encode(array('success' => true, 'aspirante' => $data[0]));
	} else {
		$result = json_encode(array('success' => false));
	}
	echo

	$result;
}

if ($postjson['task'] == 'aspiranterol') {

	$data = array();

	if ($postjson['asp_estado'] == 'psico') {
		$query = mysqli_query($mysqli, "SELECT DISTINCT * FROM vista_asp_psico ");
	}

	while ($row = mysqli_fetch_array($query)) {

		$keys = array_filter(array_keys($row), "is_numeric");
		$out = array_diff_key($row, array_flip($keys));

		$data[] = $out;
	}

	$mysqli->close();

	if ($query) {
		$result = json_encode(array('success' => true, 'aspirantes' => $data));
	} else {
		$result = json_encode(array('success' => false));
	}
	echo

	$result;
}
if ($postjson['task'] == 'talentoh1') {

	$strObjeto = "";

	foreach ($postjson as $key => $value) {

		$col_id = substr($key, 0, 4);

		if ($col_id == "atv_") {
			$strObjeto = $strObjeto . $key . " = '" . (string)$value . "',\n";
		}
	}

	$strObjeto = substr($strObjeto, 0, strlen($strObjeto) - 2);

	$query = mysqli_query($mysqli, "UPDATE asp_tthh_validar SET " . $strObjeto .
		" WHERE atv_aspirante LIKE '$postjson[atv_aspirante]'");

	$query2 = mysqli_query($mysqli, "UPDATE aspirante SET 
			asp_estado	= '$postjson[asp_estado]'
		WHERE asp_cedula LIKE '$postjson[atv_aspirante]'");

	if ($postjson['atv_aprobado'] == 'SI') {
		$strObjetoValth = 	"apv_aspirante = '$postjson[atv_aspirante]', 
							 apv_fverificado = '$postjson[atv_fverificado]' ";
		$query3 = mysqli_query($mysqli, "INSERT INTO asp_psico_validar SET " . $strObjetoValth);
	}


	$mysqli->close();

	if ($query && $query2) {
		$result = json_encode(array('success' => true));
	} else {
		$result = json_encode(array('success' => false));
	}
	echo $result;
}

if ($postjson['task'] == 'psicologia1') {

	$strObjeto = "";

	foreach ($postjson as $key => $value) {

		$col_id = substr($key, 0, 4);

		if ($col_id == "apv_") {
			$strObjeto = $strObjeto . $key . " = '" . (string)$value . "',\n";
		}
	}

	$strObjeto = substr($strObjeto, 0, strlen($strObjeto) - 2);

	$query = mysqli_query($mysqli, "UPDATE asp_psico_validar SET " . $strObjeto .
		" WHERE apv_aspirante LIKE '$postjson[apv_aspirante]'");

	$query2 = mysqli_query($mysqli, "UPDATE aspirante SET 
			asp_estado	= '$postjson[asp_estado]'
		WHERE asp_cedula LIKE '$postjson[apv_aspirante]'");

	/*if ($postjson['atv_aprobado'] == 'SI') {
		$strObjetoValth = 	"apv_aspirante = '$postjson[atv_aspirante]', 
							 apv_fverificado = '$postjson[atv_fverificado]' ";
		$query3 = mysqli_query($mysqli, "INSERT INTO asp_psico_validar SET " . $strObjetoValth);
	}*/


	$mysqli->close();

	if ($query && $query2) {
		$result = json_encode(array('success' => true));
	} else {
		$result = json_encode(array('success' => false));
	}
	echo $result;
}
