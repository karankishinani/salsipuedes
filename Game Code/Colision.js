#pragma strict

var runner1: GameObject;
var distancia : int;

function Start () {

}

function Update () {

distancia=Vector3.Distance(this.transform.position, runner1.transform.position);

if (distancia < 10)
System.Console.WriteLine(distancia);




}