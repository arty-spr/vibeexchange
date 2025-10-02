# Crypto Exchange MVP - Demo Platform

Учебная криптовалютная биржа без использования реальных денег. Идеальна для обучения и тестирования.

## 🚀 Возможности

- ✅ Регистрация и авторизация пользователей
- ✅ Виртуальный баланс $10,000 для новых пользователей
- ✅ Покупка и продажа криптовалют (BTC, ETH, USDT, BNB, ADA)
- ✅ Реальные цены через CoinGecko API
- ✅ Портфолио с отображением прибыли/убытков
- ✅ История всех транзакций
- ✅ Dashboard с обзором рынка

## 📋 Требования

- Node.js (v18 или выше)
- MongoDB (локально или MongoDB Atlas)
- npm или yarn

## 🛠️ Установка

### 1. Установка MongoDB

**Windows:**
```bash
# Скачайте и установите MongoDB Community Server с официального сайта
# https://www.mongodb.com/try/download/community
```

**MacOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Клонирование и настройка Backend

```bash
# Создайте папку проекта
mkdir crypto-exchange-mvp
cd crypto-exchange-mvp

# Создайте структуру
mkdir backend frontend

# Настройка Backend
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv axios express-validator
npm install -D nodemon

# Создайте файл .env в папке backend
```

Содержимое файла `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crypto-exchange
JWT_SECRET=your_super_secret_jwt_key_change_this_12345
INITIAL_BALANCE=10000
COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

### 3. Настройка Frontend

```bash
cd ../frontend
npm create vite@latest . -- --template react
npm install
npm install react-router-dom axios recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Структура проекта

Создайте следующую структуру файлов:

```
crypto-exchange-mvp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── tradingController.js
│   │   │   └── marketController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Transaction.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── trading.js
│   │   │   └── market.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── services/
│   │   │   └── cryptoService.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Trading.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   └── Transactions.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## 🚀 Запуск приложения

### Запуск Backend

```bash
# В папке backend
cd backend
npm run dev
```

Backend будет доступен на `http://localhost:5000`

### Запуск Frontend

```bash
# Откройте новый терминал
cd frontend
npm run dev
```

Frontend будет доступен на `http://localhost:3000`

## 📱 Использование

1. Откройте браузер и перейдите на `http://localhost:3000`
2. Зарегистрируйте новый аккаунт
3. Получите $10,000 виртуальных долларов
4. Начните торговать криптовалютами!

## 🔑 Тестовый аккаунт

После первого запуска зарегистрируйте аккаунт:
- Name: Test User
- Email: test@example.com
- Password: test123

## 📊 API Endpoints

### Auth
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Текущий пользователь

### Market
- `GET /api/market/prices` - Все цены
- `GET /api/market/prices/:symbol` - Цена конкретной валюты
- `GET /api/market/history/:symbol` - История цен
- `GET /api/market/supported` - Поддерживаемые криптовалюты

### Trading
- `POST /api/trading/buy` - Купить криптовалюту
- `POST /api/trading/sell` - Продать криптовалюту
- `GET /api/trading/transactions` - История транзакций

## 🔧 Технологический стек

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt для хэширования паролей
- CoinGecko API для цен

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Axios
- Recharts
- Lucide React (иконки)

## ⚠️ Важные замечания

- ⚠️ Это ДЕМО приложение - не используйте реальные деньги!
- ⚠️ Все транзакции виртуальные
- ⚠️ Не используйте в продакшене без дополнительной настройки безопасности
- ⚠️ CoinGecko API имеет лимит запросов (проверьте их условия)

## 🐛 Возможные проблемы и решения

### MongoDB не подключается
```bash
# Проверьте, запущен ли MongoDB
sudo systemctl status mongodb  # Linux
brew services list             # MacOS

# Проверьте порт
netstat -an | grep 27017
```

### Ошибка CORS
Убедитесь, что в `backend/server.js` подключен `cors`:
```javascript
app.use(cors());
```

### Frontend не видит Backend
Проверьте прокси в `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

## 📝 Лицензия

MIT License - используйте свободно для обучения и личных проектов.

## 🤝 Поддержка

Если возникли вопросы:
1. Проверьте, что MongoDB запущена
2. Проверьте, что backend и frontend запущены
3. Проверьте консоль браузера на ошибки
4. Проверьте логи сервера в терминале

## 🎯 Следующие шаги

- [ ] Добавить графики цен
- [ ] Добавить лимитные ордера
- [ ] Добавить больше криптовалют
- [ ] Улучшить UI/UX
- [ ] Добавить темную тему
- [ ] Добавить уведомления

---

**Приятной торговли! 🚀📈**