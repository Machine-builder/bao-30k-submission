import { Dimension, Entity, system, Vector3 } from "@minecraft/server";
import { randomWithinRange } from "./utils";

export function mobExplosion(
    spawnMobFunc: () => Entity,
    velocityHorizontalRange: [number, number],
    velocityVerticalRange: [number, number],
    mobCount: number,
    delayPerMob: number = 0
) {
    for (let i=0; i<mobCount; i++) {
        system.runTimeout(() => {
            const entity = spawnMobFunc();
            const horizontalForce = randomWithinRange(velocityHorizontalRange[0], velocityHorizontalRange[1]);
            const direction = randomWithinRange(0, 2*Math.PI);
            entity.applyKnockback(
                {
                    x: Math.sin(direction)*horizontalForce,
                    z: Math.cos(direction)*horizontalForce
                },
                randomWithinRange(velocityVerticalRange[0], velocityVerticalRange[1])
            );
        }, Math.floor(delayPerMob*i));
    }
}