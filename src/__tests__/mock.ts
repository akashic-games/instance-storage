import { vi } from "vitest";
import type { InstanceStorageLimitedPluginLike } from "..";

export function createMockInstanceStorage() {
	let hasError = false;

	const mockInstance: InstanceStorageLimitedPluginLike = {
		read: vi.fn((key, callback) => {
			setImmediate(() => {
				if (key === "error") {
					hasError = true;
					callback(new Error("invalid key"), "default-value");
				} else {
					hasError = false;
					callback(null, `mock-value-for-${key}`);
				}
			});
		}),
		write: vi.fn((key, _val, callback) => {
			setImmediate(() => {
				if (key === "error") {
					hasError = true;
					callback(new Error("invalid key"));
				} else {
					hasError = false;
					callback(null);
				}
			});
		}),
		delete: vi.fn((key, callback) => {
			setImmediate(() => {
				if (key === "error") {
					hasError = true;
					callback(new Error("invalid key"));
				} else {
					hasError = false;
					callback(null);
				}
			});
		}),
		getLength: vi.fn(callback => {
			setImmediate(() => {
				if (hasError) {
					callback(new Error("invalid length"), 0);
				} else {
					callback(null, 42);
				}
			});
		}),
		getKey: vi.fn((index, callback) => {
			setImmediate(() => {
				if (index === 42) {
					hasError = true;
					callback(new Error("invalid index"), "default-value");
				} else {
					hasError = false;
					callback(null, `mock-key-${index}`);
				}
			});
		})
	};

	return mockInstance;
}

let originalConsole: Console;

export function mockConsole() {
	originalConsole = { ...console };
	resetMockConsole();
}

export function resetMockConsole() {
	console.log = vi.fn();
	console.warn = vi.fn();
	console.error = vi.fn();
}

export function restoreConsole() {
	console.log = originalConsole.log;
	console.warn = originalConsole.warn;
	console.error = originalConsole.error;
}
