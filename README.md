# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Testing
### Make sure you have detox-cli ( npm install detox-cli --global ) and applesimutils - if on MacOS (`brew tap wix/brew && brew install applesimutils`)
### [NFL-BACKEND](https://github.com/RobertMrowiec/nfl-backend) RUNNING ON PORT 3000 IS REQUIRED IN ORDER TO PASS THE TESTS.
To run tests, please follow these steps:
   1. Go to https://expo.dev/tools#client
   2. Click "Apple .ipa archive" in the following text: "Download the Android .apk archive or the Apple .ipa archive.". It should start a download
   3. Unzip the downloaded file. Rename it to Exponent.app
   4. Put this file (Exponent.app) into the /bin directory in this repository. If /bin directory does not exists - create it in main directory (in same place where you have in. 'types', 'e2e', 'components', 'app' directories.
   5. Run the following command in the terminal: `npx expo prebuild` - it will create /ios and /android directories
   6. Run the following command in the terminal: `npx detox build --configuration ios.sim.release` - it will create a release build of the application. (it might take a while)
   7. When build is finished, start the tests by running the following command in your CLI: `npm run test` - it will start the test scenarios using a simulator. 

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
