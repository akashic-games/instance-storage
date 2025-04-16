/**
 * インスタンスストレージのインターフェース
 */
export interface InstanceStorageLike {
	/**
	 * インスタンスストレージから値を取得する。
	 * @param key キー
	 * @param callback コールバック関数
	 */
	read(key: string, callback: (error: Error | null, val: unknown) => void): void;

	/**
	 * インスタンスストレージに値を書き込む。
	 * @param key キー
	 * @param val 値
	 * @param callback コールバック関数
	 */
	write(key: string, val: unknown, callback?: (error: Error | null) => void): void;

	/**
	 * インスタンスストレージから値を削除する。
	 * @param key キー
	 * @param callback コールバック関数
	 */
	delete(key: string, callback?: (error: Error | null) => void): void;

	/**
	 * インスタンスストレージに保存されている値の要素数を取得する。
	 * @param callback コールバック関数
	 */
	getLength(callback: (error: Error | null, length: number) => void): void;

	/**
	 * インスタンスストレージのインデックス番号からキーを取得する。
	 * @param index インデックス番号
	 * @param callback コールバック関数
	 */
	getKey(index: number, callback: (error: Error | null, key: string | null) => void): void;
}
