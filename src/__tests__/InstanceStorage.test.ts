import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { InstanceStorage, promisify } from "../impl";
import { createMockInstanceStorage, mockConsole, resetMockConsole, restoreConsole } from "./mock";

describe("InstanceStorage", () => {
	beforeEach(() => {
		mockConsole();
	});

	afterEach(() => {
		restoreConsole();
	});

	it.each([[true], [false], [undefined]])("read(): verbose=%s", async verbose => {
		const mockInstanceStoragePlugin = createMockInstanceStorage();
		const instanceStorage = promisify(new InstanceStorage({ plugin: mockInstanceStoragePlugin, verbose }));

		const value1 = await instanceStorage.read("key-1");
		expect(mockInstanceStoragePlugin.read).toHaveBeenCalledWith("key-1", expect.any(Function));
		expect(value1).toBe("mock-value-for-key-1");

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#read()", "key-1");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}

		resetMockConsole();

		const value2 = await instanceStorage.read("error");
		expect(mockInstanceStoragePlugin.read).toHaveBeenCalledWith("key-1", expect.any(Function));
		expect(value2).toBe("default-value");

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#read()", "error");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#read() error", expect.any(Error));
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#read() error", expect.any(Error));
		}
	});

	it.each([[true], [false], [undefined]])("write(): verbose=%s", async verbose => {
		const mockInstanceStoragePlugin = createMockInstanceStorage();
		const instanceStorage = promisify(new InstanceStorage({ plugin: mockInstanceStoragePlugin, verbose }));

		await instanceStorage.write("key-1", "key-1-value");
		expect(mockInstanceStoragePlugin.write).toHaveBeenCalledWith("key-1", "key-1-value", expect.any(Function));

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#write()", "key-1", "key-1-value");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}

		resetMockConsole();

		await instanceStorage.write("error", "key-error-value");
		expect(mockInstanceStoragePlugin.write).toHaveBeenCalledWith("error", "key-error-value", expect.any(Function));

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#write()", "error", "key-error-value");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#write() error", expect.any(Error));
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#write() error", expect.any(Error));
		}
	});

	it.each([[true], [false], [undefined]])("delete(): verbose=%s", async verbose => {
		const mockInstanceStoragePlugin = createMockInstanceStorage();
		const instanceStorage = promisify(new InstanceStorage({ plugin: mockInstanceStoragePlugin, verbose }));

		await instanceStorage.delete("key-1");
		expect(mockInstanceStoragePlugin.delete).toHaveBeenCalledWith("key-1", expect.any(Function));

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#delete()", "key-1");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}

		resetMockConsole();

		await instanceStorage.delete("error");
		expect(mockInstanceStoragePlugin.delete).toHaveBeenCalledWith("error", expect.any(Function));

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#delete()", "error");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#delete() error", expect.any(Error));
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#delete() error", expect.any(Error));
		}
	});

	it.each([[true], [false], [undefined]])("getLength(): verbose=%s", async verbose => {
		const mockInstanceStoragePlugin = createMockInstanceStorage();
		const instanceStorage = promisify(new InstanceStorage({ plugin: mockInstanceStoragePlugin, verbose }));

		const length1 = await instanceStorage.getLength();
		expect(mockInstanceStoragePlugin.getLength).toHaveBeenCalledWith(expect.any(Function));
		expect(length1).toBe(42);

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#getLength()");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}

		await instanceStorage.read("error"); // 次の getLength() の実行時にエラーを発生させる
		resetMockConsole();

		const length2 = await instanceStorage.getLength();
		expect(mockInstanceStoragePlugin.getLength).toHaveBeenCalledWith(expect.any(Function));
		expect(length2).toBe(0); // デフォルト値が返る

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#getLength()");
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#getLength() error", expect.any(Error));
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#getLength() error", expect.any(Error));
		}
	});

	it.each([[true], [false], [undefined]])("getKey(): verbose=%s", async verbose => {
		const mockInstanceStoragePlugin = createMockInstanceStorage();
		const instanceStorage = promisify(new InstanceStorage({ plugin: mockInstanceStoragePlugin, verbose }));

		const key1 = await instanceStorage.getKey(0);
		expect(mockInstanceStoragePlugin.getKey).toHaveBeenCalledWith(0, expect.any(Function));
		expect(key1).toBe("mock-key-0");

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#getKey()", 0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}

		resetMockConsole();

		const key2 = await instanceStorage.getKey(10);
		expect(mockInstanceStoragePlugin.getKey).toHaveBeenCalledWith(10, expect.any(Function));
		expect(key2).toBe("mock-key-10");

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#getKey()", 10);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(0);
		}

		resetMockConsole();

		const length2 = await instanceStorage.getKey(42);
		expect(mockInstanceStoragePlugin.getKey).toHaveBeenCalledWith(42, expect.any(Function));
		expect(length2).toBe("default-value"); // デフォルト値が返る

		if (verbose) {
			expect(console.log).toBeCalledTimes(1);
			expect(console.log).toHaveBeenCalledWith("InstanceStoragePlugin#getKey()", 42);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#getKey() error", expect.any(Error));
		} else {
			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(0);
			expect(console.error).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalledWith("InstanceStoragePlugin#getKey() error", expect.any(Error));
		}
	});
});
