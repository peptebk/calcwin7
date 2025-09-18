var fn = function(id) {
	return document.getElementById(id);
};

Math.fix = function(n) {
	return 1/n;
};

var Util = {
	'√'	 : 'sqrt',
	'1/x': 'fix'
};


(function($) {
	var calcIcon = document.getElementById('calc-icon');
	var calculator = document.getElementById('calc');
	var isCalculatorHidden = false;

	document.querySelector('.mini').addEventListener('click', function() {
		calculator.style.display = 'none';
		calcIcon.style.display = 'block';
		isCalculatorHidden = true;
	});

	document.querySelector('.close').addEventListener('click', function() {
		calculator.style.display = 'none';
		calcIcon.style.display = 'block';
		isCalculatorHidden = true;
	});

	calcIcon.addEventListener('click', function(e) {
		e.preventDefault();
		calculator.style.display = 'block';
		calcIcon.style.display = 'none';
		isCalculatorHidden = false;
	});

	var result = $('result'), 
			formula = $('formula'), 
			calcReady, 
			functionReady;

	var sizeChange = function() {
		if(result.innerHTML.length <= 12) {
			result.style.fontSize = '22px';
			if(!result.innerHTML) {
				result.innerHTML = 0;
			}
		} else {
			result.style.fontSize = '18px';
		}
	};

	var wrap = function() {
		formula.innerHTML += result.innerHTML.charAt(0) === '-' 
			?
			'(' + result.innerHTML + ')' 
			: 
			result.innerHTML;
	};

	var _switch = function(chr) {
		switch(chr) {
			case '←':
				result.innerHTML = result.innerHTML.substring(0, result.innerHTML.length-1);
				sizeChange();
				break;
			case 'CE': 
				result.innerHTML = '0';
				calcReady = false;
				break;
			case 'C': 
				result.innerHTML = '0';
				formula.innerHTML = '';
				calcReady = false;
				break;
			case '±': 
				result.innerHTML = result.innerHTML.charAt(0) === '-' 
					? 
					result.innerHTML.substring(1,result.innerHTML.length)
					:
					'-' + result.innerHTML
				break;
			case '√': 
			case '1/x': 
				functionReady || wrap();
				formula.innerHTML = Util[chr] + '(' + formula.innerHTML + ')';
				result.innerHTML = eval('with(Math){('+formula.innerHTML+')}');
				sizeChange();
				calcReady = true;
				functionReady = true;
				break;
			case '/': 
			case '*': 
			case '-': 
			case '+': 
			case '%':
				if(calcReady) {
					formula.innerHTML =  !formula.innerHTML.split(/[+-\\*\\/]+/).pop()
						?
						formula.innerHTML.substring(0, formula.innerHTML.length-1) + chr
						:
						formula.innerHTML + chr;
				} else {
					wrap();
					result.innerHTML = eval('with(Math){('+formula.innerHTML+')}');
					sizeChange();
					formula.innerHTML += chr;
					calcReady = true;
				}
				functionReady = false;
				break;

			case '.': 
				if(calcReady) {
					result.innerHTML = '0';
					calcReady = false;
				}

				if(result.innerHTML.length < 18 && result.innerHTML.indexOf('.') == -1 ) {
					result.innerHTML += chr;
				}
				break;
			case '=': 
				wrap();
				result.innerHTML = eval('with(Math){('+formula.innerHTML+')}');
				formula.innerHTML = '';
				sizeChange();
				break;
			default: 
				if(calcReady) {
					result.innerHTML = '0';
					calcReady = false;
				}
				if(functionReady) {
					formula.innerHTML = '';
				}


				if(result.innerHTML.length < 18) {
					result.innerHTML = result.innerHTML == '0' ? chr : result.innerHTML+chr;
				}
				sizeChange();
		}
	};

	
	$('base-panel').onclick = function(e) {
		var evt = e || window.event; 
		var target = evt.target || evt.srcElement; 
		if( target.tagName.toUpperCase() === 'A' ) {
			_switch(target.innerHTML);
		}

	};

})(fn);


(function($) {
	if(!$)return;
	$('.header .mini').on('click',function() {
		$('#calc').animate({
			height: 28,
			left:114,
			bottom:160
		}, 300, 'swing', function(){
			$('.header').on('mouseover',function() {
				$('#calc').animate({
					height:288,
					left: '50%',
					bottom: '50%'
				});
			});
		});
	});

	$('.header .close').on('click',function() {
		$('#calc').hide();
		$('#calc-icon').show();
	});
		
})(jQuery);