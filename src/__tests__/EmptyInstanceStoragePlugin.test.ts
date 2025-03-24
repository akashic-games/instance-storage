import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { EmptyInstanceStoragePlugin, promisify } from "..";
import { mockConsole, restoreConsole } from "./mock";

describe("EmptyInstanceStoragePlugin", () => {
	beforeEach(() => {
		mockConsole();
	});

	afterEach(() => {
		restoreConsole();
	});

	it.each([[true], [false], [undefined]])("read(): verbose=%s", async verbose => {
		const instanceStorage = promisify(new EmptyInstanceStoragePlugin({ verbose }));

		const value = await instanceStorage.read("key-1");
		expect(value).toBeNull();

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("EmptyInstanceStoragePlugin#read()", "key-1");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}
	});

	it.each([[true], [false], [undefined]])("write(): verbose=%s", async verbose => {
		const instanceStorage = promisify(new EmptyInstanceStoragePlugin({ verbose }));

		await instanceStorage.write("key-1", "key-1-value");

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("EmptyInstanceStoragePlugin#write()", "key-1", "key-1-value");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}
	});

	it.each([[true], [false], [undefined]])("delete(): verbose=%s", async verbose => {
		const instanceStorage = promisify(new EmptyInstanceStoragePlugin({ verbose }));

		await instanceStorage.delete("key-1");

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("EmptyInstanceStoragePlugin#delete()", "key-1");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}
	});

	it.each([[true], [false], [undefined]])("getLength(): verbose=%s", async verbose => {
		const instanceStorage = promisify(new EmptyInstanceStoragePlugin({ verbose }));

		const length = await instanceStorage.getLength();
		expect(length).toBe(0);

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("EmptyInstanceStoragePlugin#getLength()");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}
	});

	it.each([[true], [false], [undefined]])("getKey(): verbose=%s", async verbose => {
		const instanceStorage = promisify(new EmptyInstanceStoragePlugin({ verbose }));

		const key1 = await instanceStorage.getKey(0);
		expect(key1).toBeNull();

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("EmptyInstanceStoragePlugin#getKey()", 0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}
	});
});
