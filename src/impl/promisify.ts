import type { InstanceStorageLike, PromisifiedInstanceStorageLike } from "../types";

/**
 * インスタンスストレージ機能を提供するオブジェクト (Promise 版) を生成する。
 * @param instanceStorage コールバック版のオブジェクト
 * @returns インスタンスストレージ機能を提供するオブジェクト (Promise 版)
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
