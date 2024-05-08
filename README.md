# Canoe FE example project
This project uses Vue 3, TypeScript and Vite. Tailwind for styling.

## Project requirements
- Node.js
- Yarn

## Project setup ( run on dev mode )
```
yarn install
yarn dev
open the browser on link provided by the terminal
```

To make the access simpler, you can access the project on the following link: [Canoe FE example project](https://canoe-fe.vercel.app/)
Also, node modules are included in the repository, but would be great to run `yarn install` before running the project.

All the features in the document are implemented, but there are some improvements that can be made.
One example of it is the testing case: We could cover some cases using `cypress` to ensure the application is working as expected.

Extra features implemented:

a. Responsive design: The application is responsive and works on mobile devices.

b. Error handling: The application handles errors and shows a message in the console. We could improve it by showing a message on the screen. [Notification Library](https://github.com/kyvg/vue3-notification) could be used for this.

c. Row selection: The application allows the user to select a row. Right now we only display the selected row in the console. We could improve it by showing the selected row on the screen. ( Adding a popup or even going to the post page )

d. Pagination controls: The application allows the user to navigate through the pages. We could improve it by adding a dropdown to select the number of items per page. Right now we show 25 items per page and it's an infinite scroll style.

e. Data Export: The application allows the user to export the data to a CSV file. We could improve it by adding more options to export the data. ( PDF, Excel, etc )

I didn't use many packages/libraries to keep the project simple and easy to understand. We could add more packages in case we need it in the future.
Components used are under the `components` folder, and the main component is the `App.vue` file.

I'm also using Vue Router to handle a single page application and use navigate between the home page and the author page.
Home page uses Vuex to handle most of the state of the application and the author page uses a the default `data()` to handle the state.