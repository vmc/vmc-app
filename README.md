#  VMC
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

[![license](https://img.shields.io/apm/l/vim-mode.svg)](https://opensource.org/licenses/MIT)

![](https://img.shields.io/badge/platform-android%20%7C%20ios-blue.svg)

## NOTE

This is a mirror from our private repository. This repository is under constant development.

## How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

**Step 4:** run `./node_modules/.bin/rn-nodeify --hack --install` (https://www.npmjs.com/package/rn-nodeify)


## How to Run App

1. cd to the repository
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * run `react-native run-android`

## Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This project adheres to Standard. Run `npm run lint` in order to spot errors.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
MapBoxToken=pk.12345
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.MapBoxToken // pk.12345
```

The `.env` file is ignored by git keeping those secrets out of your repo.
