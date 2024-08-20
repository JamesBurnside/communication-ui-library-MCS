Fork of [@azure/communication-react](https://github.com/Azure/communication-ui-library)

## Get Started

1. Install dependencies

   ```bash
   npm run setup
   ```

2. Build a local verison

    ```bash
    npm run build-and-package
    ```

   - The `build-and-package` script will build the library and create a tgz file in the `packages/communication-react/` folder. This tgz file can be installed in a local project to test the changes.

   - When making changes you will want to change the version in the `package.json`. This helps installation of the tgz file in a local project. To update the version simply update the `version` field in the `packages/communication-react/package.json` file.
