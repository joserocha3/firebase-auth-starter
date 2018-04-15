# firebase-auth-starter
Starter using React and Firebase authentication

1. Create Firebase project.
2. In Firebase Authentication dashboard create a user.
3. Set Firebase config values in `src/.env` and `src/firebase/firebase.js`.
4. Comment out `isAdmin` condition in `server/src/index.js` export `createUser`.
5. Replace `!!payload['admin']` with `true` in `client/src/components/Session/withAuthentication` method 'componentDidMount'.
6. In `server/.firebasesrc` set `default` to your Firebase project name.
7. `cd server && firebase use default`.
8. `cd client && yarn start`.
9. Log in with the user created in the Firebase console.
10. On the Users page create a new user and select the `admin` role.
11. Logout then login as the new admin user.
12. Delete the first user you created.
13. Uncomment `isAdmin` condition in `server/src/index.js` export `createUser`.
14. Revert `true` to `!!payload['admin']` in `client/src/components/Session/withAuthentication` method 'componentDidMount'.
15. Change Widgets to desired name.