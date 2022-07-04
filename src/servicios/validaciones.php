<?php

include "library/config.php";

$postjson = json_decode(file_get_contents("php://input"), true);


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
		"WHERE atv_aspirante LIKE '$postjson[atv_aspirante]'");

	if ($postjson['atv_verificado'] == 'true') {
		$query2 = mysqli_query($mysqli, "UPDATE aspirante SET 
			asp_estado	= '$postjson[asp_estado]'
		WHERE asp_cedula LIKE '$postjson[atv_aspirante]'");
	}

	$mysqli->close();

	if ($query && $query2) {
		$result = json_encode(array('success' => true));
	} else {
		$result = json_encode(array('success' => false));
	}
	echo $result;
}
