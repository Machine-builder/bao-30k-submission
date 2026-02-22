import { Vector3 } from "@minecraft/server";

export function randomWithinRange(a: number, b: number): number {
    return Math.random()*(b-a)+a;
}

export function chooseFromArray<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

export function chooseFromWeightedArray<T>(arr: Array<[number, T]>): T {
    const totalWeight = arr.reduce((sum, [weight]) => sum + weight, 0);

    const random = Math.random() * totalWeight;

    let cumulative = 0;

    for (const [weight, value] of arr) {
        cumulative += weight;

        if (random < cumulative) {
            return value;
        }
    }

    // Fallback (should never happen unless array is empty / bad weights)
    return arr[arr.length - 1][1];
}

export function distanceVector3(a: Vector3, b: Vector3) {
    return Math.sqrt(distanceSquaredVector3(a, b));
}

export function distanceSquaredVector3(a: Vector3, b: Vector3) {
    return (a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2;
}