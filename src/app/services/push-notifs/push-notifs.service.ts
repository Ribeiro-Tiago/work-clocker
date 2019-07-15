import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PushNotifsService {
	private subs: Subscription[];
	private channelId = "workclockerchannel";
	private pushObj: PushObject;

	constructor(private push: Push) {
		this.push.hasPermission()
			.then((res: any) => {
				if (res.isEnabled) {
					console.log('We have permission to send push notifications');
				} else {
					console.log('We do not have permission to send push notifications');
				}
			});

		this.subs = [];
	}

	async init(): Promise<void> {
		// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
		await this.push.createChannel({
			id: this.channelId,
			description: "Push notif channel for Work Clocker",
			importance: 3
		});

		console.log('Channel created');

		const options: PushOptions = {
			android: {
				sound: true,
				vibrate: true
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: true
			},
			browser: {
				pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			}
		};

		this.pushObj = this.push.init(options);

		this.subs.push(
			this.pushObj.on('notification').subscribe((notification: any) => console.log('Received a notification', notification)),

			this.pushObj.on('registration').subscribe((registration: any) => console.log('Device registered', registration)),

			this.pushObj.on('error').subscribe(error => console.error('Error with Push plugin', error)),
		);
	}

	destroy(): void {
		this.push.deleteChannel(this.channelId).then(() => console.log('Channel deleted'));

		this.subs.forEach(s => s.unsubscribe());
	}
}
