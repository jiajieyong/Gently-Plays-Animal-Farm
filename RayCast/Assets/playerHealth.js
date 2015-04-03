﻿#pragma strict
var playerHealth = 100;
var heart : Texture2D;
var style : GUIStyle; 
var diePrefab : GameObject;
var tpsCamera: Camera;
var fpsCamera: Camera;
var isDead = false;

private var msgList = new List.<Container>();

function Start () {
	
}

function Update () {
	
}

function ApplyDamage(damage: int){
	if (playerHealth - damage > 0 && isDead == false) {
	    playerHealth -= damage;
	    var c : Container = new Container(damage, null, null, "");
	    msgList.Add(c);
	} else if (playerHealth - damage <= 0 && isDead == false) {
    	isDead = true;
    	
    	// watch yourself die
    	fpsCamera.camera.enabled = false;
		tpsCamera.camera.enabled = true;
		Screen.showCursor = true;
		
		GetComponent(CharacterController).enabled = false;
		GetComponent(FPSInputController).enabled = false;
		GetComponent(MouseLook).enabled = false;
		tpsCamera.GetComponent(MouseLookJS).enabled = false;
		tpsCamera.GetComponent(crosshair).enabled = false;
		GameObject.Find("Inventory").active = false;
		GameObject.Find("Payload").GetComponent(payloadHealth).enabled = false;
		
   		
   		// swap to full body model to animate
   		var body = GameObject.Find("pig body");
   		var pos = body.transform.position;
   		var rot = body.transform.rotation;
    	Destroy(body);
    	Destroy(GameObject.Find("pig arm"));
    	var obj = Instantiate(diePrefab, pos ,rot);
    	obj.GetComponentInChildren(Animator).SetTrigger("Die");
    	
    	yield WaitForSeconds (2);
    	// show restart menu
		Application.LoadLevelAdditive (4); 
		
    }
}

function OnGUI () {
	if (isDead == false) {
		GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 100 ,100, 100), "" + playerHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 - 300,Screen.height - 100 ,75,75), heart);
        
        var count : int = msgList.Count;
        var time = Time.deltaTime;
        
        for (var i = 0; i < count; i++) {
			var msg = msgList[0];
		
			if (msg._time > 1) {
				msgList.RemoveAt(0);
			}
			
			style.normal.textColor = Color.red;
			
			//Fade out
			style.normal.textColor.a = 1.5 - msg._time;
				
			//Float up
			var floatingOffset = 50*(msg._time/1.5);
		
			GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 130 - floatingOffset ,100, 100), "" + -msg._dmg, style);
		
			msg._time += time;
		}
		
		style.normal.textColor = Color.white;
	}
}