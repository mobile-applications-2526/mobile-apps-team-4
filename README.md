[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bPpEXmle)
### Run the app locally

1. Start the backend
```bash
cd backend
mvn spring-boot:run
```

2. Create frontend environment file (frontend/.env)
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. In a new terminal, start the frontend
```bash
cd frontend
npm install
npx expo start
```