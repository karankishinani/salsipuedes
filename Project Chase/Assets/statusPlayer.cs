using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using SocketIO;



public class statusPlayer : MonoBehaviour {
	public GameObject jugador;
	public int distancia;
	public Vector3 startPosition;
	private SocketIOComponent socket;
	private GameObject control;
	private Animator animator;
	// Use this for initialization
	void Start () {
		GameObject go = GameObject.Find("SocketIO");
		socket = go.GetComponent<SocketIOComponent>();
		transform.position = startPosition;
		socket.Emit("LoadMap");
	}
	
	void Update(){
		transform.position = new Vector3(jugador.transform.position.x, jugador.transform.position.y + distancia, jugador.transform.position.z);
		if (Input.GetAxis ("Vertical")!= 0||Input.GetAxis ("Horizontal")!= 0)
		{
			transform.Translate(new Vector3(Input.GetAxis ("Vertical") * 3 * Time.deltaTime,0,Input.GetAxis ("Horizontal") * 3 * Time.deltaTime));
			Dictionary<string, string> data = new Dictionary<string, string>();
			data["position"] = transform.position.x.ToString()+","+(transform.position.y-distancia).ToString()+","+transform.position.z.ToString() ;
			
			socket.Emit("posicionjugador",new JSONObject(data));
		}
	}
}
