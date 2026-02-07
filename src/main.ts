import {Plugin, MarkdownPostProcessorContext} from 'obsidian';
import {initPikru, renderPikchr} from './pikru-loader';

export default class PikchrPlugin extends Plugin {
	async onload() {
		await initPikru();

		this.registerMarkdownCodeBlockProcessor(
			'pikchr',
			(source: string, el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
				this.renderDiagram(source, el);
			}
		);
	}

	private renderDiagram(source: string, el: HTMLElement): void {
		try {
			const svg = renderPikchr(source);
			el.innerHTML = svg;
			el.addClass('pikchr-diagram');
		} catch (e) {
			const errorEl = el.createEl('pre', {cls: 'pikchr-error'});
			errorEl.setText(e instanceof Error ? e.message : String(e));
		}
	}
}
