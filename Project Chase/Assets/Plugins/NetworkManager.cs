using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using SocketIO;
using MyScript;
using System.Text.RegularExpressions;

public class NetworkManager : MonoBehaviour {

	private string User = "";
	private SocketIOComponent socket;
	public GameObject otherPlayer;
	private ectScript myscript;
	//private ectScript myscript;
	//public string PlayerName;
	//public bool xx;
	//public StatusPlayer Player;
	//public GameObject otherPlayer;
	//private bool Login = true;
	//private string MessLogin = " ";
	//private string MessRegister = " ";
	//public int selectColor = 0;
	//private string[] OptionColor = new string[]{"red","green","blue"};
	//string reName = "";
	
	// Use this for initialization
	void Start () {
		DontDestroyOnLoad (gameObject);
		GameObject go = GameObject.Find("SocketIO");
		socket = go.GetComponent<SocketIOComponent>();
		myscript = go.GetComponent<ectScript>();
		socket.On("loginUnsuccess", loginUnsuccess);
		socket.On("loginSuccess", loginSuccess);
		socket.On ("nuevaposicion", PlayerMove);
		socket.On ("swapPlayer", swapPlayer);
		socket.On ("swapAllPlayer", swapAllPlayer);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	public void login(string user, string password){
		Dictionary<string, string> data = new Dictionary<string, string> ();
		data ["name"] = user;
		data ["password"] = password;
		socket.Emit ("login", new JSONObject (data));
	}
	public void signup(string user, string password){
		Dictionary<string, string> data = new Dictionary<string, string> ();
		data ["name"] = user;
		data ["password"] = password;
		socket.Emit ("signup", new JSONObject (data));
	}
	public void loginSuccess(SocketIOEvent e){
		Debug.Log("Login Exitoso");
		GameObject script = GameObject.Find("Cube");
		Debug.Log(script);
		Destroy(script);
		Application.LoadLevel("Juego");
		
		
	}
	public void loginUnsuccess(SocketIOEvent e){
		Debug.Log("Login fallido");
	}
	
	public void PlayerMove(SocketIOEvent e)
	{
		Debug.Log("Player " + myscript.jsontoString (e.data [0].ToString (), "\"") + " : " + myscript.jsontoString (e.data [1].ToString (), "\"") );
		GameObject newObj = GameObject.Find (myscript.jsontoString (e.data [0].ToString (), "\""));
		Debug.Log(newObj);
		newObj.GetComponent<OtherPlayer>().currentPosition = myscript.StringtoVector3(myscript.jsontoString(e.data [1].ToString (),"\""));
	}
	public void swapPlayer(SocketIOEvent e)
	{
		Debug.Log("hola");
		otherPlayer.GetComponent<OtherPlayer>().Name = myscript.jsontoString( e.data [0].ToString (),"\"");
		Debug.Log(otherPlayer);
		otherPlayer.GetComponent<OtherPlayer>().ID = myscript.jsontoString( e.data [1].ToString (),"\"");
		if (myscript.jsontoString(e.data [2].ToString (),"\"") == "null") 
		{
			Debug.Log(e.data[2].ToString());
			otherPlayer.GetComponent<OtherPlayer>().startPosition = Vector3.zero;
			
		} else 
		{
			Debug.Log(e.data[2].ToString());
			Debug.Log(myscript.StringtoVector3(myscript.jsontoString(e.data [2].ToString (),"\"")));
			otherPlayer.GetComponent<OtherPlayer>().startPosition = myscript.StringtoVector3(myscript.jsontoString(e.data [2].ToString (),"\""));
		}

		Instantiate(otherPlayer,otherPlayer.GetComponent<OtherPlayer>().startPosition,Quaternion.identity);
	}
	public void swapAllPlayer(SocketIOEvent e)
	{
		if(Application.loadedLevel == 1)
		{
			otherPlayer.GetComponent<OtherPlayer>().Name = myscript.jsontoString( e.data [0].ToString (),"\"");
			otherPlayer.GetComponent<OtherPlayer>().ID = myscript.jsontoString( e.data [1].ToString (),"\"");
			if (myscript.jsontoString(e.data [2].ToString (),"\"") == "null") 
			{
				otherPlayer.GetComponent<OtherPlayer>().startPosition = Vector3.zero;
				
			} else 
			{
				otherPlayer.GetComponent<OtherPlayer>().startPosition = myscript.StringtoVector3(myscript.jsontoString(e.data [2].ToString (),"\""));
			}
			
			Instantiate(otherPlayer,otherPlayer.GetComponent<OtherPlayer>().startPosition,Quaternion.identity);
		}
	}
	
}
