{
	var $code=[], // Secuencia de colores que se necesitan intentoFila
		$codeCopy=[],
		$intentoFila=[], // La secuencia de colores de la fila
		$resContent=document.getElementsByClassName('pista'),
		$secretSockets=document.getElementsByClassName('secret socket'),
		$incrementarFila = 0,
		$incrementarIntento = 0,
		$contador = 0,
		
		$colores = {
			1: 'red',
			2: 'white',
			3: 'black',
			4: 'yellow',
			5: 'orange',
			6: 'brown',
			7: 'blue',
			8: 'green'
		};

	let pintarContenedor = function() {
		//Pintamos las $('.intentoFila') $       
			let $fila = $("<div class='intentoFila' />");
		
			$('#contentFilas').append($fila);
			for (let b= 0; b < 4; b++) {
				$bola = $("<div></div>")
								.addClass('socket');
				$($('.intentoFila')[$contador]).fadeOut().append($bola);
			}

		//pintamos casillas de verificación
			$intento = $("<div class='pista' />");
			$('#contentPistas').append($intento);

			for (let b = 0; b < 2; b++) {
				$filaIntento = $("<div></div>")
										.addClass('row');
				$($('.pista')[$contador]).append($filaIntento);
			}
		for (let d = 0; d < 2; d++) {
			for (let c = 0; c < 2; c++) {
				$celdaIntento = $("<div></div>")
										.addClass('pista-socket socket');
				$($('.row')[$contador*2]).append($celdaIntento);
			}
		}

		$seleccionados = $($('.intentoFila')[$contador]);

		$seleccionados.toggle( "slide", "slow" );
	}

	//Inserta la fila puesta por el jugador
	let insertarIntento = function() {
		borrar();

		let self = this;
		let $slots = $('.intentoFila')[($incrementarFila)].getElementsByClassName('socket');
		//let $slots = $('.intentoFila:last .socket').not('.color').first();
		//console.log( $slots );

		//let $slotsRemove = $('.intentoFila')[($incrementarFila)].getElementsByClassName('socket removed');
		let $slotsRemove = $('.intentoFila:last .socket:first');
		let $slotsRemove2 = $('.intentoFila:last .socket').not('.color');
		console.log($slotsRemove2.length);

		try {
			if ($slotsRemove2.length < 4 && jQuery.inArray('removed', $intentoFila) ) {
				for (let i = 0; i < $intentoFila.length; i++) 
				{
					if ($intentoFila[i] == 'removed' && $slots.attr( "class", "socket" )) 
					{
						$slots.addClass(' color '  + self.id );
						$slots.className = 'socket color ' + self.id;
						$intentoFila.splice(i, 1, Number(self.value));
						break;
					}				
				}
			}else {
				$slots.addClass(' color '  + self.id );
				$intentoFila.push(+(self.value));
			}			
			
		console.log($intentoFila);

		} catch( err ) {}

		//Comprobamos al pulsar el boton
		$('#comprobar').on('click', function(){
			if ($intentoFila.length >= 4 && $('.intentoFila:last .color').length === 4) {
				if (mastermind.comprobarCoincidencia()){
					efectoFinal();
				}else{
					$incrementarFila += 1;
					$contador += 1;

					for (let i = 0; i <= $('.intentoFila').length-1 ; i++) {
						$($('.intentoFila')[i]).prop( "disabled", true )
												.addClass('intentoFila disabledbutton');
					};

			
					pintarContenedor();				
				}				
			}	
		});
	}

	//Borra al hacer click
	var borrar = function() {
		let allsockets = $('.socket');		
		let myFunction = function() {			
			let $classtype = $(this).attr('class');
			if ($(this).hasClass('socket color') ) {
				$(this).attr( "class", "socket" );
			}
		};
		Array.from(allsockets).forEach(function(element) {
			element.addEventListener('click', myFunction);
		});
	}
	
	//Inserta la respuesta de la comprobación
	var insertCheck = function(type) { 
		let $sockets = $('.pista')[$incrementarIntento].getElementsByClassName('pista-socket');
		$sockets[0].className=('socket ' + type);
	}

	// borrar el ultimo
	var deleteLast = function() {
		if ($intentoFila.length !== 0) {
			let $slots = $('.intentoFila:last .socket');
			$($slots[$intentoFila.length - 1]).attr( "class", "socket" );
			$intentoFila.pop();
		}
	}

	// Revela el resultado
	var revealCode = function() {
		for (let i = 0; i < $secretSockets.length; i++) {
			$($secretSockets[i]).addClass(' ' + $colores[$code[i]])
										.text('');
		}
	}
  
	// Funcion para reiniciar
	let reiniciar = function() {
		location.reload();
	}

	// Configuracion del juego
	let gameSetup = function () {
		//Pintamos código a revelar
		let $fila = $("<div></div>")
								.addClass('code');
		$('#contentFilas').append($fila);
		for (b= 0; b < 4; b++) {
			$bola = $("<div></div>")
								.addClass('secret socket');
			let secret = '?';   
			$bola.text('?');   
			$($('.code')[0]).append($bola);
		}

		pintarContenedor();
		// Añadir colores al contenedor
		for (let i = 0; i < $('.option').length; i++)
			$($('.option')[i]).on('click', insertarIntento);

		$('#delete').on('click', deleteLast);		
	}

	let cerrar = function  () {
		window.close();
	}

	//efectos
	var  efectoFinal = function() {
		$pantallaFin=$('#pantallaFin').addClass('victoria');
		$mensajeFinal= $('#mensajeFinal')
			.html('<h2>Has descubierto el código!</h2><p>Bien! Ahora podrás dormir tranquilo</p><button class="btnfin" id="hideModal">Salir</button> <button id="restartGame" class="btnfin res">Reiniciar</button>');
		$('#hideModal').on('click', cerrar);
		$('#restartGame').on('click', reiniciar);
      
		$mensajeFinal.animate({left: "50%"});
    };

	// Ejecutar juego
	var init=function(){
		mastermind.init();
		gameSetup();
		borrar();
	}

	$(document).ready(init);
}
