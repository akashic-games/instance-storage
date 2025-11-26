import { create } from "./impl";
import { promisify } from "./impl/promisify";

export * from "./impl";
export * from "./types";

/**
 * インスタンスストレージ機能を提供するオブジェクト (コールバック版)。
 */
export const instanceStorageRaw = create();

/**
 * インスタンスストレージ機能を提供するオブジェクト。
 */
export const instanceStorage = promisify(instanceStorageRaw);
