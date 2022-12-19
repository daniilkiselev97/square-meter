export default class EventEmitter {
	constructor() {
		this.events = {};
	}

	emit(eventName, data) {
		const event = this.events[eventName];
		if (event) {
			event.forEach((fn) => {
				fn.call(null, data); //Запуск фенкций в массиве события
			});
		}
	}

	subscribe(eventName, fn) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		this.events[eventName].push(fn);
		return () => {
			this.events[eventName] = this.events[eventName].filter( //Отписка от события
				(eventFn) => fn !== eventFn
			);
		};
	}
}
