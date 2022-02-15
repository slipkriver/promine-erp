<?php

	include "library/config.php";
	
    $postjson = json_decode(file_get_contents("php://input"),true);
	
	if($postjson['task']=='nuevo'){

		//GENERAL
        $query = mysqli_query($mysqli, "INSERT INTO ASPIRANTE SET
			ASPI_CEDULA	= '$postjson[cedula]',
			ASPI_NOMBRES	= '$postjson[nombres]',
			ASPI_APELLIDO1	= '$postjson[apellido1]',
			ASPI_APELLIDO2	= '$postjson[apellido2]',
			ASPI_DOMICILIO	= '$postjson[domicilio]',
			ASPI_TELEFONO	= '$postjson[telefono]',
			ASPI_NACIONALIDAD	= '$postjson[nacionalidad]',
			ASPI_REFERIDO	= '$postjson[referido]',
			ASPI_FINGRESO	= '$postjson[fingreso]',
			ASPI_FACTUALIZADO	= '$postjson[factualizado]',
			ASPI_ESTADO	= '$postjson[estado]'
        ");			

		$data = json_encode($postjson);
		
		$mysqli->close();

        if($query) {
			$result = json_encode(array('success'=>true));
		}
        else $result = json_encode(array('success'=>false));
        echo $result;
    }
	
  else if($postjson['task']=='listar'){

  	$data = array();
  	//$query = mysqli_query($mysqli, "SELECT * FROM esmeraldas ORDER BY id LIMIT $postjson[start],$postjson[limit]");
	$query = mysqli_query($mysqli, "SELECT * FROM ASPIRANTE ORDER BY ASPI_FACTUALIZADO DESC");
  	while($row = mysqli_fetch_array($query)){

	    $data[] = array(
            'cedula'	=> $row['ASPI_CEDULA'],
            'nombres'	=> $row['ASPI_NOMBRES'],
            'apellido1'	=> $row['ASPI_APELLIDO1'],
            'apellido2'	=> $row['ASPI_APELLIDO2'],
            'domicilio'	=> $row['ASPI_DOMICILIO'],
            'telefono'	=> $row['ASPI_TELEFONO'],
            'nacionalidad'	=> $row['ASPI_NACIONALIDAD'],
            'referido'	=> $row['ASPI_REFERIDO'],
            'fingreso'	=> $row['ASPI_FINGRESO'],
            'factualizado'	=> $row['ASPI_FACTUALIZADO'],
            'estado'	=> $row['ASPI_ESTADO']

  		);
  	}
	$mysqli->close();
	
  	if($query) 
		$result = json_encode(array('success'=>true, 'result'=>$data));
  	else 
		$result = json_encode(array('success'=>false));
  	echo $result;

  }


?>