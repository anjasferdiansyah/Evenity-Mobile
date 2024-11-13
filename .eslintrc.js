module.exports = {
    // "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "requireConfigFile": false,
        "ecmaFeatures": {
            "jsx": true
        },
    },
    extends: [
        'expo',
        "plugin:import-x/recommended",
        "plugin:react-native/all"
    ],
    plugins: ["react-native"],
    settings: {
        'import-x/resolver': {
            "babel-module": {
                alias: {
                    '@': '.',
                },
            },
            "react-native": {
                platform: "both",
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js']
            }
        },
        'react': {
            'version': 'detect'
        }
    },
    env: {
        'react-native/react-native': true
    },
    rules: {
        'import-x/named': 'off',
        'import-x/namespace': 'off',
        'import/no-unresolved': 'off',
        'indent': ['error', 4],
    }
};