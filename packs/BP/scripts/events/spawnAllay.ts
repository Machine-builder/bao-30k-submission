import { Dimension, Vector3, world } from "@minecraft/server";
import { LuckyBlockBreakEvent } from "../internal/init";
import { createItemShower } from "./itemShower";

const lootAllay = new Set<string>();

world.afterEvents.entityDie.subscribe((event) => {
    const entity = event.deadEntity;
    const entityId = entity.id;
    if (!lootAllay.has(entityId)) return;
    lootAllay.delete(entityId);
    spawnLootAt(entity.dimension, entity.location);
});

function spawnLootAt(dimension: Dimension, location: Vector3) {
    createItemShower(
        dimension,
        location,
        16,
        [
            "minecraft:diamond",
            "minecraft:emerald",
            "minecraft:gold_ingot",
            "minecraft:iron_ingot"
        ],
        0.4,
        [0.35, 0.5]
    );
}

export default function spawnAllay({ block, dimension }: LuckyBlockBreakEvent) {
    const entity = dimension.spawnEntity('minecraft:allay', block.center());
    lootAllay.add(entity.id);
}