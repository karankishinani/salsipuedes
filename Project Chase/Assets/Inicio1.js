#pragma strict
import System.Net.Sockets;

var port = 1234;
var server = "186.73.33.50";

var user : String ="";
var pass : String ="";

var client : TcpClient = new TcpClient(server, port);
var stream : NetworkStream = client.GetStream();
var data : System.Byte[] = System.Text.Encoding.ASCII.GetBytes("hola");
stream.Write(data, 0, data.length);

function OnGUI() {	
	GUI.Label (Rect (100, 100, 100, 20), "Usuario");
	GUI.Label (Rect (100, 150, 100, 20), "Password");

	user = GUI.TextField (Rect (200, 100, 200, 20), user, 25);
	pass = GUI.PasswordField (Rect (200, 150, 200, 20), pass, "*"[0], 25);

	if (GUI.Button(Rect(150,200,70,30),"Conectar")){
		Debug.Log("Conectar");
		/*
		Si el lobby esta lleno (4 personas)
		no se conecta y pide entrar a otro lobby.
		*/	
	}	
}