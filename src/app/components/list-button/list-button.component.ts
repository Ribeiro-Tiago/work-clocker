import { Component, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';

@Component({
	selector: 'app-list-button',
	templateUrl: './list-button.component.html',
	styleUrls: ['./list-button.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ListButtonComponent {
	@Input() onGoing: boolean;

	@Output() onClick = new EventEmitter<string>();

	onClickEmiter() {
		this.onClick.emit();
	}
}
