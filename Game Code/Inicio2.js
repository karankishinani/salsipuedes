#pragma strict


var server : String ="";
var lobby : String ="";

function OnGUI() {
	
	
	GUI.Label (Rect (100, 100, 100, 20), "Server");
	GUI.Label (Rect (100, 150, 100, 20), "Lobby");
	GUI.Label (Rect (100, 200, 100, 20), "Usuario");


	server = GUI.TextField (Rect (200, 100, 200, 20), server, 25);
	lobby = GUI.TextField (Rect (200, 150, 200, 20), lobby, 25);
	GUI.Label (Rect (200, 200, 100, 20), "Usuario(BD)");


	if (GUI.Button(Rect(200,250,70,30),"Siguiente")){
		Debug.Log("Siguiente");
		
	}
	
	
	
	}