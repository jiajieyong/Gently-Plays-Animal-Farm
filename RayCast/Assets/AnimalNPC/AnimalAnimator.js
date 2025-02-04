﻿#pragma strict
private var animator : Animator;
private var originalPos : Vector2;
private var originalMag : float;

function Start () {
	if (GetComponent(Animator) == null) {
		animator = GetComponentInChildren(Animator);
	} else {
		animator = GetComponent(Animator);
	}
	originalPos = Vector2(rigidbody.transform.position.x, rigidbody.transform.position.z) ;
	originalMag = 0;
}

function Update () {
	var pos = Vector2(rigidbody.transform.position.x, rigidbody.transform.position.z) ;

 	var movement = (pos - originalPos) * 100;
 	var magnitude = movement.magnitude;
 	
 	if (originalMag >= magnitude){
 		originalMag -= 0.2;
 		originalMag = Mathf.Max(0.1,originalMag);
 	}else if (originalMag < magnitude){
		originalMag += 0.2;
		originalMag = Mathf.Min(2,originalMag);
	}
 	
	animator.SetFloat ("Forward", originalMag);
	originalPos = pos;
}