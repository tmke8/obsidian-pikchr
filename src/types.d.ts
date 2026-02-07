declare module '@tmke8/pikru/dist/pikru_wasm_bg.js' {
	export function __wbg_set_wasm(exports: WebAssembly.Exports, module: WebAssembly.Module): void;
	export class Pikru {
		constructor(options?: {cssVariables?: boolean} | null);
		render(source: string): string;
		free(): void;
	}
}

declare module '@tmke8/pikru/dist/pikru_wasm_bg.wasm' {
	const bytes: Uint8Array;
	export default bytes;
}
