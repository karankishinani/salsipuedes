
//TAMAÑO DE LA PANTALLA
var tamx : float= Screen.width;
var tamy : float= Screen.height;

function Awake(){

tamx=Screen.width;
tamy=Screen.height;

}

//VARIABLES PARA ALMACENAR EL PERFIL DEL JUGADOR
var jugador : String;
var partidas :String;
var cantrunner : String;
var cantseeker : String;
var victoruas : String;
var perdidas : String;

	
function OnGUI(){

//windowRect = GUI.Window (0, windowRect, windowmenu, "MENU");
windowRect = GUI.Window (0, Rect (0,0,tamx,tamy), windowmenu, "MENU");

} // fin del function OnGUI

//Funcion de para poner botones
function windowmenu()
{
  
  var perfilx : float;
  var perfily : float;
  
  var tamlabelx : int;
  var tamlabely: int;
  
  var tambotonx : int;
  var tambotony : int;
  
  tamlabelx = 130;
  tamlabely = 30;
  
  tambotonx=tamlabelx;
  tambotony=tamlabely;
  
  perfilx= (tamx/2) - (tamx/4);
  perfily= (tamy/2) - (tamy/4);
  
	GUI.Button (Rect (perfilx - tambotonx - 10, perfily + ((tambotony +20)*0), tambotonx, tambotony), "JUGAR >>");
	GUI.Button (Rect (perfilx - tambotonx - 10, perfily + ((tambotony +20)*1), tambotonx, tambotony), "Buscar Lobby");
	GUI.Button (Rect (perfilx - tambotonx - 10, perfily + ((tambotony +20)*2), tambotonx, tambotony), "Crear Lobby");
	GUI.Button (Rect (perfilx - tambotonx - 10, perfily + ((tambotony +20)*3), tambotonx, tambotony), "Instrucciones");
	
	GUI.Button (Rect (perfilx,10 +  perfily*3 , 130, 30), "Abrir Chat");
	GUI.Button (Rect (perfilx*3 - 130, 10 + perfily*3, 130, 30), "Desconectar");
	
	//ESTO HARA QUE ESTE JUSTO EN EL CENTRO DE LA PANTALLA Y QUE SEA DE LA MITAD DEL TAMAÑO DE LA PANTALLA
	GUI.Box(Rect(perfilx, perfily, tamx/2, tamy/2), "PERFIL");
	
	//GUI.Label (Rect (500, 80,130,30), "NOMBRE: ");
	GUI.Label (Rect (perfilx + 10, perfily + (tamlabely*2), tamlabelx, tamlabely), "NOMBRE: " + jugador);
	GUI.Label (Rect (perfilx + 10, perfily + (tamlabely*3),200,30), "PARTIDAS JUGADOS: ");
	GUI.Label (Rect (perfilx + 10, perfily + (tamlabely*4),tamlabelx, tamlabely), "RUNNER: ");
	GUI.Label (Rect (perfilx + 10, perfily + (tamlabely*5),tamlabelx, tamlabely), "SEEKER: ");
	GUI.Label (Rect (perfilx + 10, perfily + (tamlabely*6),tamlabelx, tamlabely), "VICTORIAS: ");
	GUI.Label (Rect (perfilx + 10, perfily + (tamlabely*7),tamlabelx, tamlabely), "PERDIDAS: ");
	

}  // fin de la funcion windowmenu