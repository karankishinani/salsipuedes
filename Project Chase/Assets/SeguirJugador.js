var jugador : GameObject;
var distancia : int = 15;



function Start () {
}

function Update () {

transform.position = Vector3(jugador.transform.position.x, jugador.transform.position.y + distancia, jugador.transform.position.z);

}