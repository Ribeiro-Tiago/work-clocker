import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
	totalHours: number;
	extraHours: number;
	modalVisible: boolean;

	constructor(private storage: Storage) {
		this.totalHours = 0;
		this.extraHours = 0;
		this.modalVisible = false;
	}

	ngOnInit() {
		Promise.all([
			this.storage.get("totalHours"),
			this.storage.get("extraHours")
		])
			.then((result) => {
				this.totalHours = parseInt(result[0]) | 0;
				this.extraHours = parseInt(result[1]) | 0;
			})
			.catch(console.error);
	}

	toggleModal() {
		console.log("toggled");
		this.modalVisible = !this.modalVisible;
	}
}
