import { Observable, Subject } from "rxjs";

// Uso:

// new GabiJS.App({
//     name: '',
//     store: {
//         a: 0
//         b: '1',
//         c: [
//             'a', 'b'
//         ],
//         d: {
//             a1: 1
//         }
//     }
// })
export default class App {
  constructor(props) {
    this.name = props.name;
    this.store = new Subject();
    this.store.next(props.store);
    this.__store = props.store;
  }

  __dispatchNewStore(store) {
      const newStore = {...this.__store, ...store}
    this.__store = newStore;
    this.store.next(newStore);
  }
}
