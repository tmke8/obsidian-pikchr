import {__wbg_set_wasm, Pikru} from '@tmke8/pikru/dist/pikru_wasm_bg.js';
import * as bg from '@tmke8/pikru/dist/pikru_wasm_bg.js';
// The esbuild wasm plugin converts this import into a Uint8Array of the binary contents.
import wasmBytes from '@tmke8/pikru/dist/pikru_wasm_bg.wasm';

let pikruInstance: Pikru | null = null;

export async function initPikru(): Promise<void> {
	const wasmModule = new WebAssembly.Module(wasmBytes);
	const wasmInstance = new WebAssembly.Instance(wasmModule, {
		'./pikru_wasm_bg.js': bg,
	});
	__wbg_set_wasm(wasmInstance.exports, wasmModule);
	const start = wasmInstance.exports.__wbindgen_start;
	if (typeof start === 'function') {
		start();
	}

	pikruInstance = new Pikru({cssVariables: true});
}

export function renderPikchr(source: string): string {
	if (!pikruInstance) {
		throw new Error('Pikru WASM module not initialized');
	}
	return pikruInstance.render(source);
}
