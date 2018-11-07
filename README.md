# CRA + React + React-Router + CSS-Modules

Simulates a Video-On-Demand front site distributed in:
* Home
* Categories menu and filtered list
* Detail
* Cart

```bash
index.js
├── Core.jsx 
│   ├── Header.jsx  
│   │   ├── Icon.jsx
│   │   ├── Modal.jsx
│   ├── ViewHome.jsx
│   │   ├── Img.jsx
│   │   ├── IconLoading.jsx
│   ├── ViewList.jsx  
│   │   ├── List.jsx
│   │   │   ├── IconLoading.jsx
│   │   │   ├── Cover.jsx 
│   │   │   │   ├── Rating.jsx  
│   │   │   │   ├── Icon.jsx 
│   │   ├── Menu.jsx
│   │   │   ├── MenuItem.jsx
│   │   ├── SideMenu.jsx
│   │   │   ├── MenuItem.jsx
│   ├── ViewCart.jsx  
│   │   ├── CartItem.jsx 
│   │   ├── Icon.jsx
│   │   ├── Modal.jsx
│   ├── ViewDetail.jsx   
│   │   ├── Rating.jsx 
│   │   ├── IconLoading.jsx 
│   ├── Movies.js  
│   ├── Categories.js
│   ├── Cart.js
```

## Install create-react-app
### npm
npm install -g create-react-app  
create-react-app my-app
### npx
npx create-react-app my-app

## Start
### development
npm start or yarn start 
http://localhost:3000/
### production
yarn global add server (if not installed) 
remove key "homepage" in package.json 
npm run build 
serve -s build

## Build
npm run build or yarn build 

Builds the app for production to the build folder

## Test gh-pages GitHub
create gh-pages branch in my repository 
npm install --save gh-pages 
add to package.json:
* "homepage": "https://name_user.github.io/name_app"
* add to scripts:
- "predeploy": "npm run build",
- "deploy": "gh-pages -d build"
rpm run deploy

## CSS-Modules
npm run eject 
In webpack.config.dev.js and webpack.config.prod.js search "require.resolve('css-loader')" and add:
* modules: true,
* localIdentName: "[name]__[local]___[hash:base64:5]"

## Responsive Web Design
It shows changes in lists and categories menu according device resolution

