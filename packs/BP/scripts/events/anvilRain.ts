import { system } from "@minecraft/server";
import { LuckyBlockBreakEvent } from "../internal/init";
import { chooseFromArray, randomWithinRange } from "./utils";

export default function anvilRain({ dimension, player }: LuckyBlockBreakEvent) {
    for (let i=0; i<256; i++) {
        system.runTimeout(() => {
            if (!player.isValid) return;
            const playerLocation = player.location;
            if (Math.random() < 0.5) {
                const dripstoneLocation = {
                    x: playerLocation.x + Math.floor(randomWithinRange(-8, 8)),
                    y: playerLocation.y + 10,
                    z: playerLocation.z + Math.floor(randomWithinRange(-8, 8))
                };
                // Dripstone
                try {
                    dimension.setBlockType(
                        dripstoneLocation,
                        `minecraft:pointed_dripstone`
                    );
                } catch {}
                system.runTimeout(() => {
                    try {
                        dimension.setBlockType(
                            {
                                x: dripstoneLocation.x,
                                y: dripstoneLocation.y + 1,
                                z: dripstoneLocation.z
                            },
                            `minecraft:pointed_dripstone`
                        );
                    } catch {}
                }, 1);
            } else {
                try {
                    dimension.setBlockType(
                        {
                            x: playerLocation.x + Math.floor(randomWithinRange(-8, 8)),
                            y: playerLocation.y + 10,
                            z: playerLocation.z + Math.floor(randomWithinRange(-8, 8))
                        },
                        `minecraft:anvil`
                    );
                } catch {}
            }
        }, Math.floor(i*0.5));
    }
}