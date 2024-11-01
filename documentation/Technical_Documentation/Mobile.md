# App Mobile

This project was created using [Expo](https://expo.dev), a framework for building React Native apps.

## Installation

Run `npm install` in the root of the project directory (e.g., `/Mobile`) to install all mandatory dependencies. Make sure you have Node.js and npm installed on your system before running this command. Additionally, if you're using Expo CLI for the first time, you may need to install it globally with `npm install -g expo-cli`.

## Development server

Run `npx expo start` to start the development server. To view the app on your physical device, download the **[Expo Go](https://expo.dev/go)** app (available on iOS and Android). You can then scan the QR code displayed in the terminal using **Expo Go**. The application will automatically reload if you make changes to the source files.

## Code Scaffolding

To create new components in React Native, follow your preferred conventions. Typically, for a new component, create a new directory inside `Mobile/src/` named after your component. Within this directory, add your component file, using the `.js` extension.

For example:
```bash
> Mobile/src/YourComponentName/YourComponentName.js
> Mobile/src/YourComponentName/YourComponentNameStyle.js
```

## Build

To build your app for production, run the command `eas build --profile production --local`. This will generate an `.apk` file in the `Mobile/` directory.


## Further help

For more help with Expo and React Native, refer to the [Expo Documentation](https://docs.expo.dev/) or the [React Native Documentation](https://reactnative.dev/docs/getting-started).
