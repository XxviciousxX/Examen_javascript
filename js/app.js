var calculadora = {
	
	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	ValorUno: 0,
	ValorDos: 0,
	ValorFinal: 0,
	resultado: 0,
	blnValorConsecutivo: false, //valida si es un segundo ingreso de numero 
	
	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),
	
	//asignamos los efectos a los bot
	
	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
      x[i].onmousedown = this.eventoOnClickDown;
      x[i].onmouseup = this.eventoOnClickUp;
		};
	},

	eventoOnClickDown: function(event){
		calculadora.ClickUp(event.target);
	},

	eventoOnClickUp: function(event){
		calculadora.ClickDown(event.target);
	},
	
	//efecto en boton
	
	ClickUp: function(elemento){
    var x = elemento.id;
 
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	ClickDown: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
		
	//Eventos a los click de botones

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.IngresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.IngresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.IngresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.IngresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.IngresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.IngresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.IngresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.IngresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.IngresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.IngresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.LimpiarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.SignoCambio();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.DecimalIngreso();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.Resultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.OperacionIngreso("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.OperacionIngreso("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.OperacionIngreso("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.OperacionIngreso("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.OperacionIngreso("+");});
	},
	
			
	
	LimpiarVisor: function(){ 

	  this.valorVisor = "0";
		this.operacion = "";
		this.ValorUno = 0;
		this.ValorDos = 0;
		this.resultado = 0;
		this.Operación = "";
		this.blnValorConsecutivo = false;
		this.ValorFinal = 0;
		this.updateVisor();
	},
	
	SignoCambio: function(){
		if (this.valorVisor !="0") {
			var aux;
			if (this.valorVisor.charAt(0)=="-") {
				aux = this.valorVisor.slice(1);
			}	else {
				aux = "-" + this.valorVisor;
			}
		this.valorVisor = "";
		this.valorVisor = aux;
		this.updateVisor();
		}
	},
	
	DecimalIngreso: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.updateVisor();
		}
	},
	
	IngresoNumero: function(valor){
		if (this.valorVisor.length < 8) {
		
			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.updateVisor();
		}
	},
	
  OperacionIngreso: function (oper) {
    this.operacion = oper;
    if (this.valorVisor !== "") {
      this.ValorUno = parseFloat(this.valorVisor);
      this.valorVisor = "";      
      this.blnValorConsecutivo = false;
      this.updateVisor();
    }		
	},
	
	Resultado: function(){ 

		if(!this.blnValorConsecutivo){ 
			this.ValorDos = parseFloat(this.valorVisor);
			this.ValorFinal = this.ValorDos;
		
		
			this.realizarOperacion(this.ValorUno, this.ValorDos, this.operacion);
		
		} else { 
		
		this.realizarOperacion(this.ValorUno, this.ValorFinal, this.operacion);
		}
	
		
		this.ValorUno = this.resultado;
	
		
		this.valorVisor = "";
	
		

		if (this.resultado.toString().length < 9){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8) + "...";
		}
	
		

		this.blnValorConsecutivo = true;		
		this.updateVisor();
	
	},
	
	realizarOperacion: function(ValorUno, ValorDos, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(ValorUno + ValorDos);
			break;
			case "-": 
				this.resultado = eval(ValorUno - ValorDos);
			break;
			case "*": 
				this.resultado = eval(ValorUno * ValorDos);
			break;
			case "/": 
				this.resultado = eval(ValorUno / ValorDos);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(ValorUno));
		}
	},
	
	updateVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	}
	
};

calculadora.init();