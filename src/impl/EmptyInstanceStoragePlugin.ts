import type { InstanceStorageLimitedPluginLike } from "../types";

export interface EmptyInstanceStoragePluginParameterObject {
	verbose?: boolean;
}

/**
 * インスタンスストレージの空実装。
 * 本クラスはストレージとしての機能を持たないことに注意。
 */
export class EmptyInstanceStoragePlugin implements InstanceStorageLimitedPluginLike {
	private verbose: boolean;

	constructor({ verbose }: EmptyInstanceStoragePluginParameterObject) {
		this.verbose = verbose ?? false;
	}

	read(key: string, callback: (error: Error | null, val: unknown) => void) {
		if (this.verbose) console.log("EmptyInstanceStoragePlugin#read()", key);
		callback(null, null);
	}

	write(key: string, val: unknown, callback: (error: Error | null) => void) {
		if (this.verbose) console.log("EmptyInstanceStoragePlugin#write()", key, val);
		callback(null);
	}

	delete(key: string, callback: (error: Error | null) => void) {
		if (this.verbose) console.log("EmptyInstanceStoragePlugin#delete()", key);
		callback(null);
	}

	getLength(callback: (error: Error | null, length: number) => void) {
		if (this.verbose) console.log("EmptyInstanceStoragePlugin#getLength()");
		callback(null, 0);
	}

	getKey(index: number, callback: (error: Error | null, key: string | null) => void) {
		if (this.verbose) console.log("EmptyInstanceStoragePlugin#getKey()", index);
		callback(null, null);
	}
}
