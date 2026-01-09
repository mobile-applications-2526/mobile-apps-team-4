[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bPpEXmle)
## Run Locally

Use Android Studio for testing — the map feature crashes the web version.

### Backend Setup

```bash
cd backend
mvn spring-boot:run
```

### Frontend Setup

1. Create `frontend/.env` with:

```
NEXT_PUBLIC_API_URL=http://<device_ip>:8080
```

Device IP options:
- DEFAULT: `127.0.0.1`
- ANDROID: `10.0.2.2`
- Alternative: `localhost`
- Production: `mobile-applications-team-4-hjf8fva9hbaae8cy.westeurope-01.azurewebsites.net`

2. Start the frontend:

```bash
cd frontend
npm install
npm run android
```

If the above fails, use:

```bash
npx expo start
```

Then set `EXPO_PUBLIC_API_URL=http://<device_ip>:8080`

### Building the AAB (not APK)

1. Update dependencies:

```bash
cd frontend
npm install expo@^54.0.0
npx expo install --fix
npx expo-doctor
```

2. Configure environment variables in `.env` with production settings (both `NEXT_` and `EXPO_` prefixed variables).

3. Set up EAS:

```bash
npm install -g eas-cli
eas login
eas build:configure
```

4. Build the AAB:

```bash
eas build --platform android --profile production
```

Download the ABB from the provided link.

> **Note:** Create an account at https://expo.dev/signup and confirm your email before proceeding.
