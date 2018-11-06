# cra + react + react-router + css-modules

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
### Responsive Web Design
It shows changes in lists and categories menu according device resolution

### Install create-react-app
npm install -g create-react-app
create-react-app name_project

### CSS-Modules
npm run eject
In webpack.config.dev.js and webpack.config.prod.js search "require.resolve('css-loader')" and add:
  modules: true,
  localIdentName: "[name]__[local]__[hash:base64:5]"

