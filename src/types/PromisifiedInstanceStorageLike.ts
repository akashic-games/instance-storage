export interface PromisifiedInstanceStorageLike {
	read(key: string): Promise<unknown>;
	write(key: string, val: any): Promise<void>;
	delete(key: string): Promise<void>;
	getLength(): Promise<number>;
	getKey(index: number): Promise<string | null>;
}
