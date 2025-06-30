# Nightreign Relic Search

Web tool for searching relic combinations in **Nightreign** based on imported relics.

## Usage
### 1. Import Relics
a .txt file of exported relics in the format from this mod [https://www.nexusmods.com/eldenringnightreign/mods/38](https://www.nexusmods.com/eldenringnightreign/mods/38). 
```
item_index|item_id|item_name|effect_slot|effect_id|effect_name|relic_size|character_specific|attribute|attribute_adder|color
```

For example. A relic could look like this
```
1|1005022|Grand Burning Scene|0|7030900|Attack power increases after using grease items|4||||Red
1|1005022|Grand Burning Scene|1|7120900|Stonesword Key in possession at start of expedition|4||||Red
1|1005022|Grand Burning Scene|2|7001000|Poise +1|4||Poise|1|Red
```

### 2. Configure Vessel
Choose the required colors for each slot. 'All' slot in this case denotes the white slots that can fit any relic

### 3. Choose effects
Choose the desired effects. The number next to each effect indicates how many times it needs to appear (e.g. if you want the triple starlight shard relic from collector's signboard, set it to at least 3)

### 4. Hit find combinations

## Disclaimer

Certain effects can't be exported correctly right now. for details and contributing see [https://github.com/alfizari/Elden-Ring-Nightreign-Save-Editor-PS4](https://github.com/alfizari/Elden-Ring-Nightreign-Save-Editor-PS4). E.g. wylder's earring doesnt work at the moment

Overall it's still very buggy, If you put test your current setup it will most likely not work, mainly due to remembrance relics having bugged skills. Will try to update it but no promises
