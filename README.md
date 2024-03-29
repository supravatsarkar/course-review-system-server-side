# Course Review System With User Auth (Server Side)

### Technology used

- Programming Language- Typescript
- Framework - Express.js
- Database - mongoDB (Mongoose ORM)
- Route Validation - Zod
- Bcrypt - Password hash
- JWT - session token

**Live Server Host** https://courese-review-auth.vercel.app

**API Documentation**:- https://documenter.getpostman.com/view/19116876/2s9YsDkvKu

## API ENDPOINTS

    POST | baseurl/api/auth/register
    POST | baseurl/api/auth/login
    POST | baseurl/api/auth/changes-password (Protected:Admin/User Access)
    POST | baseurl/api/courses (Protected:Admin Access)
    GET | baseurl/api/courses
    PUT | baseurl/api/courses/:courseId (Protected:Admin Access)
    GET | baseurl/api/courses/:courseId/reviews
    GET | baseurl/api/course/best
    POST | baseurl/api/categories (Protected:Admin Access)
    POST | baseurl/api/reviews (Protected:User Access)
    GET | baseurl/api/reviews
    More details about api endpoint :- https://documenter.getpostman.com/view/19116876/2s9YsDkvKu

### How to Start Project in local

- Install git and node.js in your machine (If already done then skip this).
- `node -v` and `git --version` to make sure node and git are successfully running on your machine.
- Create a directory/folder where you can store the code in you pc.
- Run `git clone 'repo_url'` to clone the repo into your local machine.
- `cd` to project directory
- Run `npm install` command to download required node dependencies packages.
- Rename `.env.example` file to `.env` in project root dir and add your mongodb uri, others config.
- Check once your db uri connection is working fine from mongodb atlas like tool.
- Run `npm run dev` command to start project in development environment.
- Run `npm run build` command to build project for production environment.
- Run `npm run start` command to build and start project for production environment.
- Run `npm run lint` command to linting check.
- Run `npm run lint:fix` command to linting error fix.
- Run `npm run prettier:format` command to format code using prettier.

         ============== THE END===========
