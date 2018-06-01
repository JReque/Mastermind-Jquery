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
							.attr('id', b)
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

		let $slots = $('.intentoFila:last .socket').not('.color').first();
		
		let $slotsRemove = $('.intentoFila:last .removed');
		try {
			if ($slotsRemove.length > 0 ) {
				for (let i = 0; i < $intentoFila.length; i++) 
				{	 var formid = $slots.attr('id');
					if ($slots.hasClass('socket removed') === true )
					{
						$intentoFila.splice($slots.attr('id'), 1, 'removed');		
					}
					if ($intentoFila[i] == 'removed' && $slots.attr( "class", "socket removed" )) 
					{
						$slots.addClass(' color '  + self.id );
						$slots.removeClass('removed');
						$intentoFila.splice(i, 1, Number(self.value));
						break;
					}				
				}
			}else {
				if ($intentoFila.length < 4) {
					$slots.addClass(' color '  + self.id );
					$intentoFila.push(+(self.value));
				}				
			}	
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
				$(this).attr( "class", "socket removed" );
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

		$('#newGame').on('click', reiniciar);		
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
