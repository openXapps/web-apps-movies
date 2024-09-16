# Movie Information App

## Overview and purpose

This App was built as a pet project. Building small projects like this one, helped me to learn all the latest versions of React, React Router, Vite, TypeScript, Tailwind and shadcn/ui.

Special thank you to [The Movie Database](https://www.themoviedb.org/) team for providing an awesome API to query movies and TV series. This API is the main driver behind the scenes and helped me to build this App.

This App is hosted at [OpenApps - Movies](https://openapps.co.za/apps/movies/). To see more pet projects like this one, visit [OpenApps](https://openapps.co.za).

## Technology Used

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Cloning this repository

To clone this repository and play with the code, you will need to supply your own TMDB API key, which you can get from the [TMDB API](https://developer.themoviedb.org/docs/getting-started) site.

Your API key must the be placed in a file called `.env.local` like this:

```js
VITE_CIPHER_KEY=<your_secret>
VITE_API_KEY=<encripted_TMDB_API_key>
```

The `CIPHER_KEY` is used to decrypt the API key, so you will need to encrypt your API key before entering it into the `.env.local` file.

This App has a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
