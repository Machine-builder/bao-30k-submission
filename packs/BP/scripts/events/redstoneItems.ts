import { LuckyBlockBreakEvent } from "../internal/init";
import { createItemShower } from "./itemShower";


export default function spawnRedstoneItems({ block, dimension }: LuckyBlockBreakEvent) {
    createItemShower(
        dimension,
        block.center(),
        64,
        [
            "minecraft:redstone",
            "minecraft:redstone_block",
            "minecraft:redstone_lamp",
            "minecraft:dispenser",
            "minecraft:dropper",
            "minecraft:piston",
            "minecraft:sticky_piston",
            "minecraft:repeater",
            "minecraft:comparator",
            "minecraft:slime",
            "minecraft:observer",
            "minecraft:hopper",
            "minecraft:tnt",
            "minecraft:redstone_torch",
            "minecraft:crafter",

        ],
        0.15,
        [0.2, 0.3]
    )
};