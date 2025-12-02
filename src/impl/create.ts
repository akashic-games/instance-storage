import { EmptyInstanceStoragePlugin } from "./EmptyInstanceStoragePlugin";
import { InstanceStorage } from "./InstanceStorage";

export interface CreateInstanceStorageParameterObject {
	verbose?: boolean;
}

/**
 * インスタンスストレージ機能を提供するオブジェクト (コールバック版) を生成する。
 * @param param パラメータ
 * @returns インスタンスストレージ機能を提供するオブジェクト
 */
export function create(param?: CreateInstanceStorageParameterObject): InstanceStorage {
	const verbose = param?.verbose ?? false;
	let plugin = g.game.external.instanceStorageLimited;

	if (!plugin) {
		console.warn("InstanceStoragePlugin is not available.");
		plugin = new EmptyInstanceStoragePlugin({ verbose });
	}

	return new InstanceStorage({
		plugin,
		verbose
	});
}
