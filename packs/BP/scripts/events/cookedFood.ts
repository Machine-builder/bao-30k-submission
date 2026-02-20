import { createItemShower } from "./itemShower";


export default function spawnCookedFood({ block, dimension }: LuckyBlockBreakEvent) {
    createItemShower(
        dimension,
        block.center(),
        16,
        [
            "minecraft:cooked_chicken",
            "minecraft:cooked_beef",
            "minecraft:cooked_mutton"
        ],
        0.15,
        [0.2, 0.3]
    )
};