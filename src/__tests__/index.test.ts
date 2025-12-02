import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { create, EmptyInstanceStoragePlugin, InstanceStorage } from "../impl";
import { createMockInstanceStorage, mockConsole, restoreConsole } from "./mock";

describe("index", () => {
	beforeEach(() => {
		mockConsole();
	});

	afterEach(() => {
		restoreConsole();
	});

	it("check whether `g` does not exist", () => {
		expect(() => create({ verbose: false })).throw(); // 具体的なエラーメッセージについては関与しない
	});

	it.each([[true], [false], [undefined]])("use `g.game.external.instanceStorageLimited` when it exists (verbose=%s)", verbose => {
		const mockInstanceStoragePlugin = createMockInstanceStorage();

		vi.stubGlobal("g", {
			game: {
				external: {
					instanceStorageLimited: mockInstanceStoragePlugin
				}
			}
		});

		const instanceStorage = create({ verbose });
		expect(instanceStorage).toBeInstanceOf(InstanceStorage);
		expect(instanceStorage._getPlugin()).toBe(mockInstanceStoragePlugin);

		expect(console.log).toBeCalledTimes(0);
		expect(console.warn).toBeCalledTimes(0);
		expect(console.error).toBeCalledTimes(0);

		vi.unstubAllGlobals();
	});

	it.each([[true], [false], [undefined]])(
		"use EmptyInstanceStoragePlugin when `g.game.external.instanceStorageLimited` does not exist (verbose=%s)",
		verbose => {
			vi.stubGlobal("g", {
				game: {
					external: {}
				}
			});

			const instanceStorage = create({ verbose });
			expect(instanceStorage).toBeInstanceOf(InstanceStorage);
			expect(instanceStorage._getPlugin()).toBeInstanceOf(EmptyInstanceStoragePlugin);

			expect(console.log).toBeCalledTimes(0);
			expect(console.warn).toBeCalledTimes(1);
			expect(console.warn).toHaveBeenCalledWith("InstanceStoragePlugin is not available.");
			expect(console.error).toBeCalledTimes(0);

			vi.unstubAllGlobals();
		}
	);
});
