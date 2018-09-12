// funções do ciclo de vida:
// - onCreate
// - onRender
// - onDestroy
// - onError
// - onChangeState(oldState, newState)

const fooTemplate = () => `<p>foo</p>`;

export default class Component {
  constructor(options) {
    if (!options.app) {
      throw new Error("You should define an app");
      return;
    }

    this.app = options.app;

    this.el = options.el;
    this.nativeElement =
      options.nativeElement || document.querySelector(options.el);
    this.debug = options.debug || false;
    this.state = options.state || {};
    this.template = options.template || fooTemplate;
    this.onCreate = options.onCreate || this.fooLifecicleMethod("onCreate");
    this.onRender = options.onRender || this.fooLifecicleMethod("onRender");
    this.onDestroy = options.onDestroy || this.fooLifecicleMethod("onDestroy");
    this.onError = options.onError || this.fooLifecicleMethod("onError");
    this.onChangeState =
      options.onChangeState || this.fooLifecicleMethod("onChangeState");
    this.onChangeStore =
      options.onChangeStore || this.fooLifecicleMethod("onChangeStore");

    if (options.on) {
      this.setListeners(options.on);
    }

    if (options.methods) {
      for (const key in options.methods) {
        if (options.methods.hasOwnProperty(key)) {
          const fun = options.methods[key];
          this[key] = fun
        }
      }
    }

    const that = this
    this.getStore().subscribe({
      next: (store) => {
        if(options.on.changeStore) {
          options.on.changeStore.call(that, store)
        }
      }
    });

    this.onCreate();
    this.renderComponent();
  }

  setListeners(on) {
    for (const event in on) {
      switch (event) {
        case "type":
          this.setEventListener("input", on["type"]);
          break;
        case "click":
          this.setEventListener("click", on["click"]);
          break;
        default:
          break;
      }
    }
  }

  // ACTIONS
  onClick(callback) {
    const that = this;
    this.element.addEventListener("click", event => {
      callback(event);
    });
  }

  setEventListener(event, callback) {
    const that = this;
    console.log(`set on ${event} in ${this.el}`);
    
    this.nativeElement.addEventListener(event, e => {
      callback.call(that, e);
    });
  }

  setState(newState) {
    this.onChangeState(this.state, newState);
    this.state = { ...this.state, ...newState };
    console.log('novo etado', { ...this.state, ...newState });
    
    this.renderComponent();
  }

  setStore(newStore) {
    this.__dispatchNewStore({ ...newStore });
    this.renderComponent();
  }

  __dispatchNewStore(newStore) {
    this.app.__dispatchNewStore(newStore);
  }

  getStore() {
    return this.app.store || {};
  }

  fooLifecicleMethod(cicle) {
    return () => {
      if (this.debug) {
        console.log(`hey, I'm a lifecicle method: ${cicle}!`);
      }
    };
  }

  renderComponent() {
    if (this.nativeElement) {
      this.nativeElement.innerHTML = this.template();
    }

    this.onRender();
  }
}
