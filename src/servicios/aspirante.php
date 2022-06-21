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
		 asp_estado = '$postjson[asp_estado]',
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
	
  else if($postjson['task']=='listar'){

  	$data = array();
  	//$query = mysqli_query($mysqli, "SELECT * FROM esmeraldas ORDER BY id LIMIT $postjson[start],$postjson[limit]");
	$query = mysqli_query($mysqli, "SELECT * FROM ASPIRANTE ORDER BY ASPI_FACTUALIZADO DESC");
  	while($row = mysqli_fetch_array($query)){

	    $data[] = array(

            'cedula'	=> $row['asp_id'],
            'nombres'	=> $row['asp_cedula'],
            'apellido1'	=> $row['asp_codigo'],
            'apellido2'	=> $row['asp_nombres'],
            'domicilio'	=> $row['asp_apellidop'],
            'telefono'	=> $row['asp_apellidom'],
            'nacionalidad'	=> $row['asp_pais'],
            'referido'	=> $row['asp_sexo'],
            'fingreso'	=> $row['asp_edad']

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