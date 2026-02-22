import { system, TicksPerSecond } from "@minecraft/server";
import { LuckyBlockBreakEvent } from "../internal/init";

export default function orbitalLaser({ block, dimension }: LuckyBlockBreakEvent) {
    dimension.spawnParticle(`bao_30k_machine:explosion_pre`, block.center());
    system.runTimeout(() => {
        let blockCenter = block.center();
        const highestBlock = dimension.getTopmostBlock({
            x: blockCenter.x,
            z: blockCenter.z
        });

        if (highestBlock) {
            blockCenter.y = highestBlock.y;
        }

        dimension.spawnParticle(`bao_30k_machine:explosion_laser`, blockCenter);

        for (let i=0; i<64; i++) {
            system.runTimeout(() => {
                try {
                    dimension.createExplosion(
                        {
                            x: blockCenter.x,
                            y: blockCenter.y - i,
                            z: blockCenter.z
                        },
                        4,
                        {
                            allowUnderwater: true
                        }
                    )
                } catch {}
            }, i);
        };

    }, 4*TicksPerSecond);
}