import { Block, system, world } from "@minecraft/server";


system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent('bao_30k_machine:void_bacteria', {
        onRandomTick: (e => {
            if (!e.block) return;
            // Chance to spread to neighbouring block(s)

            const block = e.block;

            for (const n of [
                "above", "below", "north", "east", "south", "west"
            ]) {
                if (Math.random() > 0.25) continue;

                let otherBlock: Block | undefined;
                switch (n) {
                    case "above": otherBlock = block.above(); break;
                    case "below": otherBlock = block.below(); break;
                    case "north": otherBlock = block.north(); break;
                    case "east":  otherBlock = block.east();  break;
                    case "south": otherBlock = block.south(); break;
                    case "west":  otherBlock = block.west();  break;
                }

                if (!otherBlock) return;
                if (otherBlock.isAir || otherBlock.isLiquid) return;
                if (otherBlock.typeId === "bao_30k_machine:void_bacteria") return;

                otherBlock.setType("bao_30k_machine:void_bacteria");
            }

            if (Math.random() < 0.25) {
                // Decay to air
                block.setType("minecraft:air");
            }
        })
    })
})