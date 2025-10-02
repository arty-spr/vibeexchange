# 🚀 Быстрый старт

## Шаг 1: Установка зависимостей

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Шаг 2: Настройка окружения

Создайте файл `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto-exchange
JWT_SECRET=your_secret_key_12345
INITIAL_BALANCE=10000
```

## Шаг 3: Запуск MongoDB

```bash
# Windows - запустите MongoDB Compass или службу
# MacOS
brew services start mongodb-community
# Linux
sudo systemctl start mongodb
```

## Шаг 4: Запуск приложения

### Терминал 1 - Backend:
```bash
cd backend
npm run dev
```
✅ Должно появиться: `🚀 Server running on http://localhost:5000`

### Терминал 2 - Frontend:
```bash
cd frontend
npm run dev
```
✅ Должно появиться: `Local: http://localhost:3000`

## Шаг 5: Использование

1. Откройте `http://localhost:3000`
2. Нажмите "Register"
3. Заполните форму регистрации
4. Получите $10,000 виртуальных долларов
5. Начните торговать! 🎉

## 📝 Проверка работы

**Backend работает?**
```bash
curl http://localhost:5000/api/health
# Должен вернуть: {"success":true,"message":"Server is running"}
```

**MongoDB работает?**
```bash
mongosh
# Должно подключиться к MongoDB
```

## ⚡ Быстрое тестирование

После регистрации попробуйте:
1. **Dashboard** - посмотрите текущие цены криптовалют
2. **Trading** - купите немного BTC или ETH
3. **Portfolio** - увидите свои активы
4. **Transactions** - история всех покупок/продаж

---

Всё готово! Наслаждайтесь торговлей! 🎯