<a href="https://app.netlify.com/sites/cgmv-survey/deploys"><img src="https://api.netlify.com/api/v1/badges/38a74394-b90e-40b7-8397-45c547f04d07/deploy-status" alt="Netlify Status" /></a> <a href="https://www.codacy.com/gh/mendoza-research/cgmv-survey/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mendoza-research/cgmv-survey&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/e2bc6db565634c1d85d5be4968ef6879"/></a> <a href="https://deepscan.io/dashboard#view=project&tid=10181&pid=17023&bid=374429"><img src="https://deepscan.io/api/teams/10181/projects/17023/branches/374429/badge/grade.svg" alt="DeepScan grade"></a>

## App Link
https://cgmv-survey.netlify.app/

### Link with predefined `gamification` and `financialInformation` values

This is useful when you're testing the app with predefined treatments. Using these links will bypass the default treatment assignment logic.

- 🔗 [Gamification, Financial Information A](https://cgmv-survey.netlify.app/?gamification=GAMIFICATION&financialInformation=A)
- 🔗 [Gamification, Financial Information B](https://cgmv-survey.netlify.app/?gamification=GAMIFICATION&financialInformation=B)
- 🔗 [No gamification, Financial Information A](https://cgmv-survey.netlify.app/?gamification=NO_GAMIFICATION&financialInformation=A)
- 🔗 [No gamification, Financial Information B](https://cgmv-survey.netlify.app/?gamification=NO_GAMIFICATION&financialInformation=B)


## Hasura Console
View and modify data at [https://cgmv-hasura.roundpool.com/](https://cgmv-hasura.roundpool.com/).

### Exporting Data

Connect to the [https://cgmv-hasura.roundpool.com/](https://cgmv-hasura.roundpool.com/) and navigate to *Data* - `cgmv_sessions`. Use the *Export data* button to select the desired output format (CSV or JSON).

![image](https://user-images.githubusercontent.com/1064036/117975471-53a4b680-b2f4-11eb-88e5-c2e80ddd76d7.png)

## Animations 📽

You can adjust the animation duration by updating the `ANIMATION_DURATION` variable value in `survey-settings.ts` file. 

```typescript
// survey-settings.ts

// Gamification animation duration in milliseconds
// 2000 == 2 seconds
export const ANIMATION_DURATION = 2000;
```

## High-level Architecture 🔭
![App Architecture](https://user-images.githubusercontent.com/1064036/116986338-47d14880-ac93-11eb-98df-e6493e35e530.png)

- This app is built with [Next.js](https://nextjs.org/). 
- Anything that the users see are deployed to Netlify.
- All data are recorded into a PostgreSQL database.
- [Hasura GraphQL engine](https://hasura.io/) is used to communicate between the app and the database.

## Continuous Deployment Requirements 🔨

All commits pushed to the `main` branch are automatically deployed to Netlify. If you wish to clone this repository and deploy it to a different Netlify proejct, please see below for the requirements.

### Netlify-related Requirements 🧪

- Use `netlify-plugin-nextjs` plugin to deploy Next.js serverless functions.
- The tutorial for one-click install can be found [here](https://www.netlify.com/blog/2020/12/07/announcing-one-click-install-next.js-build-plugin-on-netlify/).
- Add a `netlify.toml` file to support `netlify-plugin-nextjs`.

### PostgreSQL + Hasura Requirements 🗄

This web app requires a [Hasura](https://hasura.io/) GraphQL server. 

- Deploy a Hasura docker container to [Heroku](http://heroku.com/) or [DigitalOcean](https://www.digitalocean.com/).
  - Smallest instances under $10 per month are sufficient for this web app unless there are 10,000+ concurrent connections.
- Netlify does not support requests to non-SSL domains. Configure a custom domain and enable https.
  - [Guide here](https://hasura.io/docs/latest/graphql/core/deployment/deployment-guides/digital-ocean-one-click.html#adding-a-domain-enabling-https)
- Add the custom domain to `lib/apollo-client.ts`.

```typescript
export default function createApolloClient() {
  return new ApolloClient({
    uri: "https://your-hasura-domain-name/v1/graphql",
    cache: new InMemoryCache(),
  });
}
```


## Running locally 🏃‍♀️
To run the site in a local environment, install the two programs below.
- Node.js (with NPM) - https://nodejs.org/en/
- (Optional if using only NPM) yarn - https://yarnpkg.com/lang/en/

### Install packages
```bash
yarn
# or
npm install
```

### Run site
```bash
yarn dev
# or
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser.
