![@dafcoe/vue-swappable-card sample](https://github.com/dafcoe/vue-swappable-card/blob/main/src/assets/images/sample.gif?raw=true)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@dafcoe/vue-swappable-card)
![npm](https://img.shields.io/npm/dt/@dafcoe/vue-swappable-card?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/dafcoe/vue-swappable-card?style=flat-square)

# @dafcoe/vue-swappable-card
Easy to use, customisable swappable card library built using Vue3.

## Installation
Install the package as a project dependency using `yarn` or `npm`:
```
$ yarn add @dafcoe/vue-swappable-card

--- or ---

$ npm install --save @dafcoe/vue-swappable-card
```

## Usage
Import `VueSwappableCard` component, either globally (on your main.js / main.ts file) or locally (on your component):
```js
// Globally
import VueSwappableCard from '@dafcoe/vue-swappable-card'
const app = createApp(App)
app.use(VueSwappableCard).mount('#app')

// Locally
import {
  VueSwappableCard,
} from '@dafcoe/vue-swappable-card'
```

Import default styles (optional - you can define your own styling):
```js
import '@dafcoe/vue-swappable-card/dist/vue-swappable-card.css'
```

Use it in the template as follows:
```html
<vue-swappable-card>
    <template #content-primary>
        <h1>Face A</h1>
        <div>
            <p>Lorem ipsum dolor sit amet...</p>
        </div>
    </template>
    <template #content-secondary>
        <h1>Face B</h1>
        <div>
            <p>Lorem ipsum dolor sit amet...</p>
        </div>
    </template>
</vue-swappable-card>
```

## Options
#### Direction
By default, the swap direction is from bottom to top. You can use "from-top", "from-bottom", "from-left" or "from-right" on `direction` prop:
```html
<vue-swappable-card direction="from-top|from-bottom|from-left|from-right">
    ...
</vue-wappable-card>
```

#### Event
By default, the card swaps when overing it. You can use "over" or "click" on `event` prop:
```html
<vue-swappable-card direction="over|click">
    ...
</vue-wappable-card>
```

#### Swapped
By default, the primary content / front face is shown as main content/face. You can change this using `swapped` prop:
```html
<vue-swappable-card swapped>
    ...
</vue-wappable-card>
```

## License
[MIT License](https://opensource.org/licenses/MIT) © [Daf Coe](mailto:dafcoe@gmail.com)
