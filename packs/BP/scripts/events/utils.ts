import { Vector3 } from "@minecraft/server";

export function randomWithinRange(a: number, b: number): number {
    return Math.random()*(b-a)+a;
}

export function chooseFromArray<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

export function distanceVector3(a: Vector3, b: Vector3) {
    return Math.sqrt(distanceSquaredVector3(a, b));
}

export function distanceSquaredVector3(a: Vector3, b: Vector3) {
    return (a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2;
}