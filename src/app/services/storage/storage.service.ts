import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { StorageKey } from 'src/app/types/Storage';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private keyPrefix: string;

	constructor(private storage: Storage) {
		this.keyPrefix = "WC_";
	}

	get(key: StorageKey): Promise<any> {
		return this.storage.get(this.formKey(key));
	}

	set(key: StorageKey, data: any): Promise<any> {
		return this.storage.set(this.formKey(key), data);
	}

	async update(key: StorageKey, data: any): Promise<any> {
		const items = await this.get(key) as Array<any> || [];

		return this.set(key, [data, ...items]);
	}

	delete(key: StorageKey): Promise<any> {
		return this.storage.remove(this.formKey(key));
	}

	async setIfNotExists(key: StorageKey, data: any): Promise<any> {
		const result = await this.get(key);

		if (!result) {
			return this.set(key, data);
		}

		return result;
	}

	clear(): Promise<void> {
		return this.storage.clear();
	}

	async clearExcept(key: StorageKey[]): Promise<void> {
		return (await this.storage.keys()).forEach((k: StorageKey) => !key.includes(k) && this.delete(k));
	}

	private formKey(key: StorageKey): string {
		return `${this.keyPrefix}${key}`;
	}
}
