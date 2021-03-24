![@dafcoe/vue-notification sample](https://github.com/dafcoe/vue-notification/blob/main/src/assets/images/sample.gif?raw=true)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@dafcoe/vue-notification?style=flat-square)
![npm](https://img.shields.io/npm/dt/@dafcoe/vue-notification?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/dafcoe/vue-notification?style=flat-square)

# @dafcoe/vue-notification
Easy to use, customisable notification/toast library built using Vue3.

## Installation
Install the package as a project dependency using `yarn` or `npm`:
```
$ yarn add @dafcoe/vue-notification

--- or ---

$ npm install --save @dafcoe/vue-notification
```

## Usage
Import `VueNotificationList` component, either globally (on your main.js / main.ts file) or locally (on your component):
```js
// Globally
import VueNotificationList from '@dafcoe/vue-notification'
const app = createApp(App)
app.use(VueNotificationList).mount('#app')

// Locally
import { VueNotificationList } from '@dafcoe/vue-notification'
```

Import default styles (optional - you can define your own styling):
```js
import '@dafcoe/vue-notification/dist/vue-notification.css'
```

Use it in the template as follows:
```html
<vue-notification-list></vue-notification-list>
```

## Options
#### Position
By default, the notification list is displayed on bottom right corner of the screen. You can customize this using "top-left", "top-right", "bottom-left" or "bottom-right" on `position` prop:
```html
<vue-notification-list position="top-left|top-right|bottom-left|bottom-right"></vue-notification-list>
```

## Pushing Notifications
To push a notification, you have call `setNotification` from `vue-notification.store`, passing a notification object:
```javascript
import { useNotificationStore } from '@dafcoe/vue-notification/vue-notification.store'
...
const { setNotification } = useNotificationStore()
setNotification(notificationA)
setNotification(notificationB)
```
A notification object has the following properties:
```json
{
  "message": string,
  "type": string ("info"|"warning"|"alert"|"success"),
  "showIcon": boolean,
  "dismiss": {
    "manually": boolean,
    "automatically": boolean
  },
  "duration": number,
  "showDurationProgress": boolean,
  "appearance": string ("light"|"dark"|"glass")
}
```
Please check the [demo](https://dafcoe.github.io/vue-notification) page to easily see all propreties in action.

## License
[MIT License](https://opensource.org/licenses/MIT) © [Daf Coe](mailto:dafcoe@gmail.com)
