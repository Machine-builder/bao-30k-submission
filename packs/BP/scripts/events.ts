/*
  This file defines which events you have added to the lucky block.
*/
import { LuckyBlockEventData } from "./internal/init";

import spawnAllay from "./events/spawnAllay";
import "./events/voidBacteria";
import spawnBooks from "./events/spawnBooks";
import spawnCookedFood from "./events/cookedFood";
import nearbyCorruption from "./events/nearbyCorruption";
import orbitalLaser from "./events/orbitalLaser";
import spawnRedstoneItems from "./events/redstoneItems";
import jebSheepExplosion from "./events/jebSheep";
import anvilRain from "./events/anvilRain";
import singleValuableItem from "./events/singleValuableItem";
import villager from "./events/villager";

import "./events/voidBacteria";
import placeVoidBacteria from "./events/voidBacteria";

export default {
  author: "MACHINE_BUILDER",

  events: [
    nearbyCorruption,
    spawnAllay,
    spawnBooks,
    spawnCookedFood,
    orbitalLaser,
    spawnRedstoneItems,
    jebSheepExplosion,
    anvilRain,
    singleValuableItem,
    villager,
    placeVoidBacteria
  ]
} as LuckyBlockEventData