# Макет: light-1

### Ссылка на макет: [Figma 'light-1' template](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/light-1?type=design&node-id=932-3961&mode=design&t=VCMDVvNjAbCo2lft-0)

### Project / Front domain: [https://ga-movies.nomoredomains.icu.ru](https://ga-movies.nomoredomains.icu.ru)
#### ТЗ (Этап IV): [https://practicum.yandex.ru/learn/web/courses/347389fe-50f8-4223-937b-d478373f38bf/sprints/40140/topics/97cc89f9-d314-4720-ab34-eae819224906/lessons/05adf862-8464-4536-ae9d-2a55d99fea8b/](https://practicum.yandex.ru/learn/web/courses/347389fe-50f8-4223-937b-d478373f38bf/sprints/40140/topics/97cc89f9-d314-4720-ab34-eae819224906/lessons/05adf862-8464-4536-ae9d-2a55d99fea8b/)
#### Критерии (Этап IV): [https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)

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


### window.innerWidth 
- изменение количества отображаемых фильмов, в зависимости от ширины экрана устройства

### localStorage
- сохранение/восстановление в локальной памяти предыдущих состояний (при перезагрузке): 
1. текст запроса поиска на странице,
2. состояние переключателя короткометражек 
3. отображение на странице ранее найденных фильмов, взятых из localStorage


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
