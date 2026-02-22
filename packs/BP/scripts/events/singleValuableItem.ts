import { ItemStack } from "@minecraft/server";
import { LuckyBlockBreakEvent } from "../internal/init";
import { chooseFromArray } from "./utils";

export default function singleValuableItem({ dimension, block }: LuckyBlockBreakEvent) {
    dimension.spawnItem(new ItemStack(chooseFromArray([
        `minecraft:nether_star`,
        `minecraft:beacon`,
        `minecraft:netherite_block`,
        `minecraft:diamond_block`
    ])), block.bottomCenter());
};