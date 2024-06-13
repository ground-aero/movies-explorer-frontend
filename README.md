# Movies Explorer App
- `Movies Explorer` - Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.
*The service where you can find movies and save it to your personal account.*

### Приложение состоит из следующих страниц:
#### *This App includes the following pages:*
`Главная (main)`. Содержит информацию о выполненном проекте.
`Страница с фильмами (movies)`. На ней есть форма поиска фильмов и блок с результатами поиска.
`Страница с сохранёнными фильмами (saved movies)`. Показывает фильмы, сохранённые пользователем.
`Страница регистрации (register)`. Позволяет пользователю зарегистрировать аккаунт.
`Страница авторизации (authorization)`. На ней пользователь может войти в систему.
`Страница редактирования профиля (profile)`. Пользователь может изменить данные своего аккаунта. 

--- 
### *Как он должен работать?*
#### *How the application should work?*
Пользователь вводит в строку поиска ключевые слова и нажимает кнопку «Искать». После этого сайт должен выполнить два действия:
*The user enters keywords into the search bar and clicks the “Search” button. The App should then perform two actions:*
- отправить запрос к нашему сервису с данными о фильмах, получить данные и сохранить;
*send a request to our service with movie data, retrieve the data and save it;*
- согласно введённому в поисковую строку тексту запроса найти все подходящие фильмы и отобразить карточки с ними;
*according to the query text entered in the search form, find all matching movies and display movie cards;*
- когда пользователь сохраняет фильм, он должен отображаться в специальном разделе сайта;
*when a user saves a movie, it should be displayed in a special section of the site;*
- изменение количества отображаемых фильмов, в зависимости от ширины экрана устройства (window.innerWidth )
- сохранение/восстановление в локальной памяти предыдущих состояний (при перезагрузке): 
*saving/restoring previous states in local memory (on page reload):*
1. текст запроса поиска на странице,
*the text of the search query on the page*
2. состояние переключателя короткометражек 
*status of the short-movies switcher*
3. отображение на странице ранее найденных фильмов, взятых из localStorage
*display previously found movies taken from localStorage on the page*

### Работа с Form/inputs
- Поле 'name' валидируется на фронте через атрибут — pattern при помощи регулярного выражения; 
*The 'name' field is being validated on the front end via pattern attribute using a regular expression;*
- Мгновенная валидация полей за счет псевдоклассов :invalid, :valid
*Prompt validation of fields due to pseudo-classes :valid, :invalid,*


---
### *Front domain address:*
- [https://ga-movies.nomoredomainsicu.ru](https://ga-movies.nomoredomainsicu.ru)

### *Server domain address:*
- [https://api.ga-movies.nomoredomainsicu.ru](https://api.ga-movies.nomoredomainsicu.ru)

### *Films DataBase address:*
-  `https://api.nomoreparties.co/beatfilm-movies`

#### *Template:*
 *[Figma 'light-1' template](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/light-1?type=design&node-id=932-3961&mode=design&t=VCMDVvNjAbCo2lft-0)*

---
### *Tech Stack:*
FRONT: *HTML, CSS, JavaScript, React*
BACK: *NodeJS, Express, MongoDB*
INFRASTRUCTURE: *WebPack, Git, Github*
DEV OPS: *VM, Ubuntu, Nginx, SSL*
