import { EmptyInstanceStoragePlugin } from "./impl/EmptyInstanceStoragePlugin";
import { InstanceStorage } from "./impl/InstanceStorage";
import type { InstanceStorageLike, PromisifiedInstanceStorageLike } from "./types";

export * from "./impl";
export * from "./types";

export interface CreateInstanceStorageParameterObject {
	verbose?: boolean;
}

/**
 * instance-storage のインスタンスを生成する。
 * @param param パラメータ
 * @returns instance-storage のインスタンス
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

/**
 * Promise 化された instance-storage のインスタンスを返す。
 * @param instanceStorage instance-storage のインスタンス
 * @returns Promise 化された instance-storage のインスタンス
 */
export function promisify(instanceStorage: InstanceStorageLike): PromisifiedInstanceStorageLike {
	return {
		read(key: string) {
			return new Promise((resolve, reject) => instanceStorage.read(key, (err, val) => void (err ? reject(err) : resolve(val))));
		},
		write(key: string, val: unknown) {
			return new Promise((resolve, reject) => instanceStorage.write(key, val, err => void (err ? reject(err) : resolve())));
		},
		delete(key: string) {
			return new Promise((resolve, reject) => instanceStorage.delete(key, err => void (err ? reject(err) : resolve())));
		},
		getLength() {
			return new Promise((resolve, reject) => instanceStorage.getLength((err, len) => void (err ? reject(err) : resolve(len))));
		},
		getKey(index: number) {
			return new Promise((resolve, reject) => instanceStorage.getKey(index, (err, key) => void (err ? reject(err) : resolve(key))));
		}
	};
}
