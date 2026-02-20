import { LuckyBlockBreakEvent } from "../internal/init";
import { randomWithinRange } from "./utils";

export default function spawnBooks({ block, dimension }: LuckyBlockBreakEvent) {
    for (let i=0; i<Math.floor(randomWithinRange(6, 9)); i++) {
        const entity = dimension.spawnEntity('bao_30k_machine:book', block.center());
        entity.applyKnockback({
                x: randomWithinRange(-0.85, 0.85),
                z: randomWithinRange(-0.85, 0.85)
            },
            randomWithinRange(0.1, 0.4)
        );
    }
}