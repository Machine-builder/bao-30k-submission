/*
  This file defines which events you have added to the lucky block.
*/
import { LuckyBlockEventData } from "./internal/init";

import spawnAllay from "./events/spawnAllay";
import "./events/voidBacteria";
import spawnBooks from "./events/spawnBooks";
import spawnCookedFood from "./events/cookedFood";
import nearbyCorruption from "./events/nearbyCorruption";

export default {
  author: "MACHINE_BUILDER",

  events: [
    nearbyCorruption,
    spawnAllay,
    spawnBooks,
    spawnCookedFood
  ]
} as LuckyBlockEventData