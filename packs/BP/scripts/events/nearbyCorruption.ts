import { Block, Dimension, LiquidType, system, Vector3, world } from "@minecraft/server";
import { LuckyBlockBreakEvent } from "../internal/init";
import { chooseFromArray, distanceSquaredVector3, distanceVector3, randomWithinRange } from "./utils";

function replaceBlock(dimension: Dimension, location: Vector3, type: string) {
    let block: Block | undefined;
    try {
        block = dimension.getBlock(location);
    } catch {
        return; // Out of loaded chunks likely
    }
    if (!block) return;
    if (block.isAir || block.isLiquid) return;
    block.setType(type);
}

type ActiveCorruption = {
    dimension: Dimension,
    blockQueue: Vector3[],
    oreRarity: number
};

const corruptions: ActiveCorruption[] = [];

export default function nearbyCorruption({ block, dimension }: LuckyBlockBreakEvent) {
    // Create sorted list of blocks around broken lucky block
    // sorted by distance to lucky block

    const blockLocations: [number, Vector3][] = [];
    const luckyBlockLocation = block.location;

    const distance = 10;

    for (let x=-distance; x<=distance; x++) {
        for (let y=-distance; y<=distance; y++) {
            for (let z=-distance; z<=distance; z++) {
                const blockLocation = {
                    x: luckyBlockLocation.x + x,
                    y: luckyBlockLocation.y + y,
                    z: luckyBlockLocation.z + z,
                };
                const distanceSquared = distanceVector3(luckyBlockLocation, blockLocation);
                if (distanceSquared + randomWithinRange(-2, 1) > distance) continue;
                blockLocations.push([distanceSquared, blockLocation]);
            }
        }
    }

    blockLocations.sort((a, b) => a[0]-b[0] + randomWithinRange(0, 2));

    const onlyBlockLocations = blockLocations.map(x => x[1]);

    corruptions.push({
        dimension: dimension,
        blockQueue: onlyBlockLocations,
        oreRarity: randomWithinRange(0.65, 0.9)
    });

    if (corruptionUpdateInterval === undefined) {
        startCorruptionUpdateInterval();
    }
}

function updateCorruption(corruption: ActiveCorruption): boolean {
    const { dimension, blockQueue, oreRarity } = corruption;

    if (blockQueue.length === 0) {
        return false;
    }

    const amountPerTick = 20;
    const toProcess = blockQueue.splice(0, amountPerTick);

    for (const location of toProcess) {
        replaceBlock(
            dimension,
            location,
            Math.random() < oreRarity ? "minecraft:stone": chooseFromArray([
                "minecraft:coal_ore",
                "minecraft:iron_ore",
                "minecraft:diamond_ore",
                "minecraft:emerald_ore",
                "minecraft:redstone_ore"
            ])
        );
    }

    return blockQueue.length > 0;
}

let corruptionUpdateInterval: number | undefined;

function startCorruptionUpdateInterval() {
    corruptionUpdateInterval = system.runInterval(() => {
        for (let i = corruptions.length - 1; i >= 0; i--) {
            const stillActive = updateCorruption(corruptions[i]);

            if (!stillActive) {
                corruptions.splice(i, 1);
            }
        }

        if (corruptions.length === 0) {
            system.clearRun(corruptionUpdateInterval as number);
            corruptionUpdateInterval = undefined;
        }
    }, 1);
};