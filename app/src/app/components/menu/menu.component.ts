import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Tutorial } from "src/app/state/tutorial/tutorial.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/state";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, OnDestroy {
	private $tut: Observable<Tutorial>;
	private sub: Subscription;

	currStage: number;

	constructor(store: Store<AppState>) {
		this.$tut = store.select("tutorial");

		this.sub = null;
	}

	ngOnInit() {
		this.sub = this.$tut.subscribe(({ currStage }) => this.currStage = currStage);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
