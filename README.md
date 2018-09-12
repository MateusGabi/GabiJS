# GabiJS

Welcome to my own web-framework. This project is experimental, so I do not recommend you develop an application to production using GabiJS yet.

## Getting Started

### Using
You don't need install. Just paste in your `index.html`:

`&lt;script src="https://rawgit.com/MateusGabi/GabiJS/master/dist/gabi.js"&gt;&lt;/script&gt;`

#### Example

```html
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;GabiJS App&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
         &lt;div id='message' /&gt;


    &lt;script src="https://rawgit.com/MateusGabi/GabiJS/master/dist/gabi.js"&gt;&lt;/script&gt;
    &lt;script src='dist/app.js' /&gt;
    &lt;/body&gt;
&lt;/html&gt;
```

### Create your App

```javascript
// app.js
var GabiJS = window.GabiJS

var MyApp = new GabiJS.App({
    name: 'My App',
    store: {
        message: 'Hello World'
    }
})
```

### Create your Component

```javascript
var DisplayMessageComponent = new GabiJS.Component({
    app: MyApp,
    el: '#message',
    template: function () {
        return this.state.message
    }
})
```

## API

### App


#### Example

```javascript
// app.js
var GabiJS = window.GabiJS

var MyApp = new GabiJS.App({
    name: 'My App',
    store: {
        message: 'Hello World'
    }
})
```

#### Options

- `name: String`: Application Name.
- `store: Object`: Application State. It is a variable that could be accessed in every component. `Store` is similar to  Redux Store object.


### Component


#### Example

```javascript
var users = new GabiJS.Component({
    app: MyApp,
    el: '#id',
    state: {
        a: '',
        users: []
    },
    onCreate: function () {
        fetch('http://api.app.br/users')
            .then(users =&gt; this.setState({ users }))
    },
    on: {
        changeStore: function (store) {
            this.setState({ a: store.a })
        },
        onChangeState: function (_old, _new) {
            console.log('Old store':, _old)
            console.log('New store':, _new)
        },
    },
    template: function () {
        var count = this.state.users.length
        if (var count &lt; 1)
            return 'Not users found'
        else
            return 'You have ' + count + ' users'
    }
})
```

#### Options

- `app: App`: Instance of `GabiJS.App()`.
- `debug: boolean`: show some logs.
- `el`: component query selector. Example: `div`, `#id`, `.class`, `etc`.
- `nativeElement`: Optional. Component `NodeElement` instance.
- `state`: Object visible just in the component. "Component database".
- `onCreate`: Function that will be executed when a component is created. You can make some requested to your API using this method.
- `onRender`: Function that will be executed when a component is rendered.
- `on`: Object that contains reactive events.
  - `changeState`: Function that will be executed before the state change.
  - `changeStore`: Function that will be executed after the store change.
  - `click`: a function that will be executed when a user clicks in the component. **Do not use arrow-function**.
  - `type`: a function that will be executed when a user is typing. Use in `&lt;input /&gt;`. **Do not use arrow-function**.
- `template`: a function that will be executed when a component will render. **Do not use arrow-function**.
- `methods`: an object that contains all component methods.