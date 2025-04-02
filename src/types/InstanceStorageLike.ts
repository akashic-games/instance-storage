export interface InstanceStorageLike {
	read(key: string, callback: (error: Error | null, val: unknown) => void): void;
	write(key: string, val: unknown, callback?: (error: Error | null) => void): void;
	delete(key: string, callback?: (error: Error | null) => void): void;
	getLength(callback: (error: Error | null, length: number) => void): void;
	getKey(index: number, callback: (error: Error | null, key: string | null) => void): void;
}
