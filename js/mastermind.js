/**
 * Juego masterMind
 * 
 * @author Jesús Requena Pérez
 */
mastermind=(function(){
	let init = function(){

		generateCode(1, 9);
	};

	let mostrar = function(){
		revealCode();
	}
	let comprobarCoincidencia = function() {
		let $isMatch = true;
		$codeCopy = $code.slice(0);

		// Comprueba si posición y color son correctas
		for (let i = 0; i < $code.length; i++) {
			if ($intentoFila[i] === $code[i]) {
				insertCheck('acierto');
				$codeCopy[i] = 0;
				$intentoFila[i] = -1;
			}else{
				$isMatch = false;
			}
		}

		// Comprueba si la posición es correcta
		for (let j = 0; j < $code.length; j++) {
			if ($codeCopy.indexOf($intentoFila[j]) !== -1) {
				insertCheck('cerca');
				$codeCopy[$codeCopy.indexOf($intentoFila[j])] = 0;
			}
		}
		$incrementarIntento += 1; 
		$intentoFila = [];  // Reset $intentoFila 

		return $isMatch;
	}

	// Genera el código secreto
	let generateCode = function(min, max) {
		for (let i = 0; i < 4; i++)
			$code[i] = Math.floor(Math.random() * (max - min)) + min;
	}

	return{
		init:init,
		generateCode:generateCode,
		mostrar:mostrar,
		comprobarCoincidencia:comprobarCoincidencia
	}
})();
