export interface PromisifiedInstanceStorageLike {
	/**
	 * インスタンスストレージから値を取得する。
	 * @param key キー
	 * @returns 値
	 */
	read(key: string): Promise<unknown>;

	/**
	 * インスタンスストレージに値を書き込む。
	 * @param key キー
	 * @param val 値
	 */
	write(key: string, val: any): Promise<void>;

	/**
	 * インスタンスストレージから値を削除する。
	 * @param key キー
	 */
	delete(key: string): Promise<void>;

	/**
	 * インスタンスストレージに保存されている値の要素数を取得する。
	 * @returns 要素数
	 */
	getLength(): Promise<number>;

	/**
	 * インスタンスストレージのインデックス番号からキーを取得する。
	 * @param index インデックス番号
	 * @returns キー
	 */
	getKey(index: number): Promise<string | null>;
}
