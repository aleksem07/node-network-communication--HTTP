import { AppRoutes } from '../common/routes';

export const homePage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Main</title>
        </head>
        <body>
            <h1>Welcome</h1>
            <a href=${AppRoutes.USERS} alt="go users">
              go users
            </a>
        </body>
        </html>
    `;
