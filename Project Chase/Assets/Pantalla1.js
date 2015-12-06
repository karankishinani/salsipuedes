//TAMAÑO DE LA PANTALLA
var tamx : float= Screen.width;
var tamy : float= Screen.height;


/*---------------------------------------------------------------------------------------------------------------*/
var txtusuario : String = "";
var txtcontrasena : String = "";
var booservidor = true;
var booservidor2 = true;
var windowRect : Rect = Rect (150,100,1050,400);

var nm :  NetworkManager;

function Awake(){

tamx=Screen.width;
tamy=Screen.height;

}

function setMeOnly() :boolean
{
  booservidor = booservidor2 = false;
  return true;
}

function OnGUI(){
windowRect = GUI.Window (0,  Rect (0,0,tamx,tamy), windowlogin, "LOGIN");

} // fin de la funcion OnGUI

function windowlogin()
{
  
  var tamlabelx : int;
  var tamlabely: int;
  
  var tambotonx : int;
  var tambotony : int;
  
  tamlabelx = 130;
  tamlabely = 30;
  
  tambotonx=150;
  tambotony=30;

GUI.Label (Rect (tamx/2 - tamlabelx, (tamy/4) + (tambotony * 0),tamlabelx,tamlabely), "USUARIO:");
GUI.Label (Rect (tamx/2 - tamlabelx, (tamy/4) + (tambotony * 2),tamlabelx,tamlabely), "CONTRASEÑA:");

txtusuario = GUI.TextField (Rect (tamx/2, tamy/4 + (tambotony * 0), tambotonx,tambotony), txtusuario, 20);
txtcontrasena = GUI.PasswordField (Rect (tamx/2, tamy/4 + (tambotony * 2), tambotonx,tambotony), txtcontrasena, "*"[0],16);

if(GUI.Toggle(Rect (tamx/2 - tamlabelx, tamy/4 + (tambotony * 4), tamlabelx, tamlabely), booservidor, "SERVIDOR 1"))
{ 
   booservidor = true;
   booservidor2= false;
} 

if(GUI.Toggle(Rect (tamx/2, tamy/4 + (tambotony * 4), tamlabelx, tamlabely), booservidor2, "SERVIDOR 2"))
{ 
   booservidor = false;
   booservidor2= true;
} 

 
nm = GetComponent(NetworkManager);
 if(GUI.Button(Rect(tamx/2 - tamlabelx, tamy/4 + (tambotony * 6), 90, 30), "Conectar")){
	nm.login(txtusuario, txtcontrasena);
 };  
 GUI.Button(Rect(tamx/2 + tambotonx - 80, tamy/4 + (tambotony * 6), 80, 30), "Cancelar"); 
 if(GUI.Button(Rect(tamx/2 - 55, tamy/4 + (tambotony * 8), 110, 30), "Registrar")){
	nm.signup(txtusuario, txtcontrasena); 
 }
 
 
 
 /*conexiones de los botones*/

} // fin de la funcion  windowlogin





