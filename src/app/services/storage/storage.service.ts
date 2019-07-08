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

	async clear(): Promise<void> {
		return this.storage.clear();
	}

	async clearExcept(keys: StorageKey[]): Promise<void> {
		let tmp: StorageKey;

		this.storage.forEach(async (_v: any, k: StorageKey) => {
			tmp = this.unformKey(k);

			if (!keys.includes(tmp)) {
				this.delete(tmp);
			}
		});
	}

	private formKey(key: StorageKey): string {
		return `${this.keyPrefix}${key}`;
	}

	private unformKey(key: string): StorageKey {
		return key.split("WC_")[1] as StorageKey;
	}
}
