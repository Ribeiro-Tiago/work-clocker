import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private keyPrefix: string;

	constructor(private storage: Storage) {
		this.keyPrefix = "WC_";
	}

	get(key: string) {
		return this.storage.get(this.formKey(key));
	}

	add(key: string, data: any) {
		return this.storage.set(this.formKey(key), data);
	}

	async update(key: string, data: any) {
		key = this.formKey(key);
		const items = await this.storage.get(key) as Array<any> || [];

		return this.storage.set(key, [...items, data]);
	}

	delete(key: string) {
		return this.storage.remove(this.formKey(key));
	}

	private formKey(key: string): string {
		return `${this.keyPrefix}${key}`;
	}
}
