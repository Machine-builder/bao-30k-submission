import { LuckyBlockBreakEvent } from "../internal/init";
import { mobExplosion } from "./mobExplosion";

export default function jebSheepExplosion({ block, dimension }: LuckyBlockBreakEvent) {
    mobExplosion(
        () => {
            const sheep = dimension.spawnEntity("minecraft:sheep", block.bottomCenter());
            sheep.nameTag = "jeb_";
            return sheep;
        },
        [0.1, 0.2],
        [0.3, 0.6],
        32,
        0.5
    )
}