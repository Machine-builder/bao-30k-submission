import { Dimension, ItemStack, system, Vector3 } from "@minecraft/server";
import { chooseFromArray, randomWithinRange } from "./utils";

export function createItemShower(
    dimension: Dimension,
    location: Vector3,
    count: number,
    itemsArray: string[],
    horizontalVelocity: number,
    verticalVelocityRange: [number, number]
) {
    for (let i=0; i<count; i++) {
        system.runTimeout(() => {
            const itemEntity = dimension.spawnItem(new ItemStack(
                chooseFromArray(itemsArray), 1
            ), location);
            itemEntity.applyImpulse({
                x: randomWithinRange(-1, 1)*horizontalVelocity,
                y: randomWithinRange(verticalVelocityRange[0], verticalVelocityRange[1]),
                z: randomWithinRange(-1, 1)*horizontalVelocity
            })
        }, i);
    }
}