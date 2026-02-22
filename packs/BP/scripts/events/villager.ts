import { world } from "@minecraft/server";
import { LuckyBlockBreakEvent } from "../internal/init";

export default function villager({ block, dimension }: LuckyBlockBreakEvent) {
    world.structureManager.place(
        `bao_30k:machine/villager`,
        dimension,
        block.location
    )
}