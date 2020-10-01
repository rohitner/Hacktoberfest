import hashlib
BOSS_HORSE = "MechaOmkar-YG6BPRJM"
with open("horse_names.txt")as f:
    for name in range(1,128):
	for name2 in range(1,128):
        	boss_speed = int(hashlib.md5(("Horse_" + BOSS_HORSE).encode()).hexdigest(), 16)
        	your_speed = int(hashlib.md5(("Horse"+"[@g").encode()).hexdigest(), 16)
        	if(your_speed>boss_speed):
				print(name,your_speed-boss_speed)
