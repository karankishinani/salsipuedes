using UnityEngine;
using System.Collections;

using MySql.Data;
using MySql.Data.MySqlClient;

/*using System.Data; 
using System.Data.Sql; 
using System.Data.SqlClient; 

*/

public class Conexion : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
		string connectionString =
			"Server=server10.000webhost.com;" +
				"Database=a7395980_dbchase;" +
				"User ID=a7395980_dbchase;" +
				"Password=carademierda1;";
		
		MySqlConnection dbcon;
		dbcon = new MySqlConnection(connectionString);
		dbcon.Open();


	}


	
	// Update is called once per frame
	void Update () {
	
	}
}
