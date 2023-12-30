# Course Review System (Server Side)

### Technology used

- Programming Language- Typescript
- Framework - Express.js
- Database - mongoDB (Mongoose ORM)
- Route Validation - Zod

**Live Server Host** https://course-review-system-l2-a3.vercel.app

## Routes

    POST | baseurl/api/courses
    GET | baseurl/api/courses
    PUT | baseurl/api/courses/:courseId
    GET | baseurl/api/courses/:courseId/reviews
    GET | baseurl/api/courses/best
    POST | baseurl/api/categories
    POST | baseurl/api/reviews
    GET | baseurl/api/reviews

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
