Fork of [@azure/communication-react](https://github.com/Azure/communication-ui-library)

## Get Started

1. Install dependencies

   ```bash
   npm run setup
   ```

2. Run a sample app

    - First update the `appsettings.json` in the `Server/` folder (create a copy of the template and fill in values from your ACS resource in the Azure portal)

    - Then build once:

      ```bash
      npm run build-and-package # only do this once, other changes can be hot-reloaded
      ```

    - Start the sample (starts server and front end app):

      ```bash
      cd samples\Calling
      npm run start
      ```

3. Build a local verison

    ```bash
    npm run build-and-package
    ```

   - The `build-and-package` script will build the library and create a tgz file in the `packages/communication-react/` folder. This tgz file can be installed in a local project to test the changes.

   - When making changes you will want to change the version in the `package.json`. This helps installation of the tgz file in a local project. To update the version simply update the `version` field in the `packages/communication-react/package.json` file.
