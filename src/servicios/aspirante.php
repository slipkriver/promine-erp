<?php

	include "library/config.php";
	
    $postjson = json_decode(file_get_contents("php://input"),true);
	
	if($postjson['task']=='nuevo'){

        $query = mysqli_query($mysqli, "INSERT INTO aspirante SET 
         asp_cedula = '$postjson[asp_cedula]',
		 asp_codigo = '$postjson[asp_codigo]',
		 asp_nombres = '$postjson[asp_nombres]',
		 asp_apellidop = '$postjson[asp_apellidop]',
		 asp_apellidom = '$postjson[asp_apellidom]',
		 asp_pais = '$postjson[asp_pais]',
		 asp_sexo = '$postjson[asp_sexo]',
		 asp_edad = '$postjson[asp_edad]',
		 asp_correo = '$postjson[asp_correo]',
		 asp_ecivil = '$postjson[asp_ecivil]',
		 asp_gpo_sanguineo = '$postjson[asp_gpo_sanguineo]',
		 asp_cargo = '$postjson[asp_cargo]',
		 asp_sueldo = '$postjson[asp_sueldo]',
		 asp_conadis = '$postjson[asp_conadis]',
		 asp_nro_conadis = '$postjson[asp_nro_conadis]',
		 asp_discapacidad = '$postjson[asp_discapacidad]',
		 asp_porcentaje = '$postjson[asp_porcentaje]',
		 asp_experiencia = '$postjson[asp_experiencia]',
		 asp_nmb_experiencia = '$postjson[asp_nmb_experiencia]',
		 asp_ing_entrevista = '$postjson[asp_ing_entrevista]',
		 asp_fch_ingreso = '$postjson[asp_fch_ingreso]',
		 asp_telefono = '$postjson[asp_telefono]',
		 asp_direccion = '$postjson[asp_direccion]',
		 asp_hora_entrevista = '$postjson[asp_hora_entrevista]',
		 asp_referencia = '$postjson[asp_referencia]',
		 asp_estado = 'INGRESADO',
		 asp_observaciones = '$postjson[asp_observaciones]',
		 asp_observacion_medico = '$postjson[asp_observacion_medico]',
		 asp_observacion_final = '$postjson[asp_observacion_final]',
		 asp_academico = '$postjson[asp_academico]',
		 asp_fecha_nacimiento = '$postjson[asp_fecha_nacimiento]',
		 asp_militar = '$postjson[asp_militar]',
		 asp_aprobacion = '$postjson[asp_aprobacion]',
		 asp_evaluacion = '$postjson[asp_evaluacion]',
		 asp_condicion = '$postjson[asp_condicion]',
		 asp_lugar_nacimiento = '$postjson[asp_lugar_nacimiento]',
		 asp_etnia = '$postjson[asp_etnia]',
		 asp_religion = '$postjson[asp_religion]',
		 asp_banco = '$postjson[asp_banco]',
		 asp_nro_cuenta = '$postjson[asp_nro_cuenta]',
		 asp_nombre_familiar = '$postjson[asp_nombre_familiar]',
		 asp_parentezco_familiar = '$postjson[asp_parentezco_familiar]',
		 asp_telefono_familiar = '$postjson[asp_telefono_familiar]',
		 asp_descripcion_vivienda = '$postjson[asp_descripcion_vivienda]',
		 asp_referencia_vivienda = '$postjson[asp_referencia_vivienda]',
		 asp_cargas = '$postjson[asp_cargas]',
		 asp_cargas_primaria = '$postjson[asp_cargas_primaria]',
		 asp_cargas_secundaria = '$postjson[asp_cargas_secundaria]',
		 asp_vivienda = '$postjson[asp_vivienda]',
		 asp_construccion = '$postjson[asp_construccion]',
		 asp_movilizacion = '$postjson[asp_movilizacion]',
		 asp_recomendado = '$postjson[asp_recomendado]'
        ");			

		$data = json_encode($postjson);
		
		$mysqli->close();

        if($query) {
			$result = json_encode(array('success'=>true,'sql'=>'Listo!'));
		}
        else $result = json_encode(array('success'=>false,'sql'=>'Error'));
        echo $result;
    }
	
  else if($postjson['task']=='buscar'){

  	$data = array();
  	//$query = mysqli_query($mysqli, "SELECT * FROM esmeraldas ORDER BY id LIMIT $postjson[start],$postjson[limit]");
	$query = mysqli_query($mysqli, "SELECT * FROM aspirante WHERE 
		asp_nombres LIKE '%$postjson[texto]%' OR 
		asp_apellidop LIKE '%$postjson[texto]%' OR 
		asp_apellidom LIKE '%$postjson[texto]%' OR 
		asp_cedula LIKE '%$postjson[texto]%' OR 
		asp_codigo LIKE '%$postjson[texto]%' 
		ORDER BY asp_fch_ingreso DESC");
  	while($row = mysqli_fetch_array($query)){

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
			'asp_observaciones' => $row['asp_observaciones']

  		);
  	}
	$mysqli->close();
	
  	if($query) 
		$result = json_encode(array('success'=>true, 'result'=>$data));
  	else 
		$result = json_encode(array('success'=>false));
  	echo $result;

  }


  else if($postjson['task']=='listarporestado'){

	$data = array();
	//$query = mysqli_query($mysqli, "SELECT * FROM esmeraldas ORDER BY id LIMIT $postjson[start],$postjson[limit]");
  $query = mysqli_query($mysqli, "SELECT asp_codigo,asp_cedula,asp_nombres,asp_apellidop,asp_apellidom,
                    asp_cargo,asp_fch_ingreso,asp_telefono,asp_estado,asp_recomendado,asp_observaciones, 
                    est_descripcion
                    FROM aspirante 
                    
	                INNER JOIN estados
		                ON estados.est_nombre LIKE aspirante.asp_estado
		                
	                WHERE estados.est_id > $postjson[id_estado]
	ORDER BY asp_fch_ingreso DESC");
	
	while($row = mysqli_fetch_array($query)){

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
  
	if($query) 
	  $result = json_encode(array('success'=>true, 'result'=>$data));
	else 
	  $result = json_encode(array('success'=>false));
	echo $result;

}

?>