using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using SocketIO;

public class OtherPlayer : MonoBehaviour 
{
	public string Name ;
	public string ID;
	public Vector3 startPosition;
	public Vector3 currentPosition = Vector3.zero;
	private SocketIOComponent socket;

	void Start () 
	{
		GameObject go = GameObject.Find("SocketIO");
		socket = go.GetComponent<SocketIOComponent>();
	}

	void Update () 
	{
		gameObject.name = Name;
		if (startPosition != Vector3.zero) 
		{
			currentPosition = startPosition;
			startPosition = Vector3.zero;
			transform.position = Vector3.Lerp (transform.position, currentPosition, 50 * Time.deltaTime);
		}
		else
		{
			transform.position = Vector3.Lerp (transform.position, currentPosition, 50 * Time.deltaTime);
		}
	}
}
