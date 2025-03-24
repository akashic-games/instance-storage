import type { InstanceStorageLike, InstanceStorageLimitedPluginLike } from "../types";

export interface InstanceStorageParameterObject {
	plugin: InstanceStorageLimitedPluginLike;
	verbose?: boolean;
}

export class InstanceStorage implements InstanceStorageLike {
	private plugin: InstanceStorageLimitedPluginLike;
	private verbose: boolean;

	constructor({ plugin, verbose }: InstanceStorageParameterObject) {
		this.plugin = plugin;
		this.verbose = verbose ?? false;
	}

	read(key: string, callback: (error: Error | null, val: unknown) => void): void {
		if (this.verbose) console.log("InstanceStoragePlugin#read()", key);

		this.plugin.read(key, (error, val) => {
			if (error) {
				console.error("InstanceStoragePlugin#read() error", error);
			}
			callback(null, val);
		});
	}

	write(key: string, val: unknown, callback?: (error: Error | null) => void): void {
		if (this.verbose) console.log("InstanceStoragePlugin#write()", key, val);

		this.plugin.write(key, val, error => {
			if (error) {
				console.error("InstanceStoragePlugin#write() error", error);
			}
			callback?.(null);
		});
	}

	delete(key: string, callback?: (error: Error | null) => void): void {
		if (this.verbose) console.log("InstanceStoragePlugin#delete()", key);

		this.plugin.delete(key, error => {
			if (error) {
				console.error("InstanceStoragePlugin#delete() error", error);
			}
			callback?.(null);
		});
	}

	getLength(callback: (error: Error | null, length: number) => void): void {
		if (this.verbose) console.log("InstanceStoragePlugin#getLength()");

		this.plugin.getLength((error, length) => {
			if (error) {
				console.error("InstanceStoragePlugin#getLength() error", error);
			}
			callback(null, length);
		});
	}

	getKey(index: number, callback: (error: Error | null, key: string | null) => void): void {
		if (this.verbose) console.log("InstanceStoragePlugin#getKey()", index);

		this.plugin.getKey(index, (error, key) => {
			if (error) {
				console.error("InstanceStoragePlugin#getKey() error", error);
			}
			callback(null, key);
		});
	}

	_getPlugin(): InstanceStorageLimitedPluginLike {
		return this.plugin;
	}
}
