[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bPpEXmle)
### Run locally

Use Android Studio for testing — the map feature crashes the web version making it unusable.

1. Start the backend:
```bash
cd backend
mvn spring-boot:run
```

2. Create frontend env (frontend/.env):
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8080
```

3. Start the frontend:
```bash
cd frontend
npm install
npm run android
```