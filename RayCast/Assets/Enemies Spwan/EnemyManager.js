	#pragma strict

var playerHealth : playerHealth;       // Reference to the player's heatlh.
var enemy : GameObject;                // The enemy prefab to be spawned.
var spawnTime : float = 5f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this enemy can spawn from.

var spawnMode : SpawnType;
var totalWaves : float = 3f;
private var numWaves : float = 1f;
var enemyDeathCount : float = 0f;
var spawn = true;
var totalEnemies : float = 0f;


function Start ()
{
	var enemyNum : float;
	StartCoroutine("StartSpawn");
	
	
}

function StartSpawn() {


		
	while (spawn) {
		Debug.Log("spawn continues");
		switch(spawnMode) {
			case SpawnType.Normal: 
				yield WaitForSeconds(spawnTime);
				Spawn();
				
				if (playerHealth.playerHealth <= 0f) 
					spawn = false;
					
				break;
			
			case SpawnType.Wave:
				if (numWaves <= totalWaves) {
				
				
					Debug.Log(enemyDeathCount);
					
					if (totalEnemies <= numWaves*5f && enemyDeathCount <= numWaves*5f) {
						yield WaitForSeconds(spawnTime);
						Spawn();
					}
					
					if (enemyDeathCount >= numWaves*5f) {
						Debug.Log("here");
						enemyDeathCount = 0f;
						totalEnemies = 0f;
						numWaves++;
						yield WaitForSeconds(7);
						break;
					}
					
					break;
					
					
					
					
					
				} else {
					spawn = false;
				}
				
				break;
			
			
			default:
            	spawn = false;
                break;
		}
		
		yield new WaitForEndOfFrame ();
			
	}
	

}

function Spawn ()
{
    // If the player has no health left...
    if(playerHealth.playerHealth <= 0f)
    {
        // ... exit the function.
        return;
    }

    // Find a random index between zero and one less than the number of spawn points.
    var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);
    // Create an instance of the enemy prefab at the randomly selected spawn point's position and rotation.
    var clone = Instantiate (enemy, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
    
    clone.GetComponent(Enemy).updateEM(gameObject);
    
    totalEnemies++;
}

function EnemyDeath() {
	
	if (spawnMode==SpawnType.Wave)
		enemyDeathCount++;

}