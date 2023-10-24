# Макет: light-1

### Ссылка на макет: [Figma 'light-1' template](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/light-1?type=design&node-id=932-3961&mode=design&t=VCMDVvNjAbCo2lft-0)

### Project / Front domain: [https://ga-movies.nomoredomains.icu.ru](https://ga-movies.nomoredomains.icu.ru)

## Movies Explorer App
- `Movies Explorer` - Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

---

### *База Данных фильмов находится по адресу:*

-  https://api.nomoreparties.co/beatfilm-movies

 
### *Как он должен работать?*
Пользователь вводит в строку поиска ключевые слова и нажимает кнопку «Искать». 
После этого сайт должен выполнить два действия:
- отправить запрос к нашему сервису с данными о фильмах, получить данные и сохранить;
- согласно введённому в поисковую строку тексту запроса найти все подходящие фильмы и отобразить карточки с ними;
- когда пользователь сохраняет фильм, он должен отображаться в специальном разделе сайта.

### *Сайт состоит из следующих страниц:*
1. Главная. Содержит информацию о выполненном проекте.
2. Страница с фильмами. На ней есть форма поиска фильмов и блок с результатами поиска.
3. Страница с сохранёнными фильмами. Показывает фильмы, сохранённые пользователем.
4. Страница регистрации. Позволяет пользователю зарегистрировать аккаунт.
5. Страница авторизации. На ней пользователь может войти в систему.
6. Страница редактирования профиля. Пользователь может изменить данные своего аккаунта.

--- 

### Работа с Form/inputs
- Поле 'name' валидировано на фронте через атрибут — pattern при помощи регулярного выражения; 
- Мгновенная валидация полей за счет псевдоклассов :invalid, :valid

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
