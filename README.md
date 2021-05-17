<a href="https://app.netlify.com/sites/cgmv-survey/deploys"><img src="https://api.netlify.com/api/v1/badges/38a74394-b90e-40b7-8397-45c547f04d07/deploy-status" alt="Netlify Status" /></a> <a href="https://www.codacy.com/gh/mendoza-research/cgmv-survey/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mendoza-research/cgmv-survey&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/e2bc6db565634c1d85d5be4968ef6879"/></a> <a href="https://deepscan.io/dashboard#view=project&tid=10181&pid=17023&bid=374429"><img src="https://deepscan.io/api/teams/10181/projects/17023/branches/374429/badge/grade.svg" alt="DeepScan grade"></a>

## App link
https://cgmv-survey.netlify.app/

### Link with predefined `gamification` and `financialInformation` values

This is useful when you're testing the app with predefined treatments. Using these links will bypass the default treatment assignment logic.

- 🔗 [Gamification, Financial Information A](https://cgmv-survey.netlify.app/?gamification=GAMIFICATION&financialInformation=A)
- 🔗 [Gamification, Financial Information B](https://cgmv-survey.netlify.app/?gamification=GAMIFICATION&financialInformation=B)
- 🔗 [No gamification, Financial Information A](https://cgmv-survey.netlify.app/?gamification=NO_GAMIFICATION&financialInformation=A)
- 🔗 [No gamification, Financial Information B](https://cgmv-survey.netlify.app/?gamification=NO_GAMIFICATION&financialInformation=B)

## Hasura console
View and modify data at [https://cgmv-hasura.roundpool.com/](https://cgmv-hasura.roundpool.com/).

### Exporting data

Connect to the [https://cgmv-hasura.roundpool.com/](https://cgmv-hasura.roundpool.com/) and navigate to *Data* - `cgmv_sessions`. Use the *Export data* button to select the desired output format (CSV or JSON).

![image](https://user-images.githubusercontent.com/1064036/117975471-53a4b680-b2f4-11eb-88e5-c2e80ddd76d7.png)

### Making changes with live preview

[CodeSandbox](https://codesandbox.io/) is an online editor that supports live preview.

Go to [CodeSandbox](https://codesandbox.io/) and click on *Sign In*.

![image](https://user-images.githubusercontent.com/1064036/118423772-62d88b00-b68b-11eb-9278-da237d5fb0b6.png)

Click on *Sign in with GitHub*.

![image](https://user-images.githubusercontent.com/1064036/118423824-7edc2c80-b68b-11eb-854d-bd1db3f1a3c6.png)

Once you're signed in, click on the *Repositories* menu on the left.

![image](https://user-images.githubusercontent.com/1064036/118424245-7afcda00-b68c-11eb-87b6-e3dcb74cdcf9.png)

Click on *Import Repository".

![image](https://user-images.githubusercontent.com/1064036/118424336-b0a1c300-b68c-11eb-8da0-301a489e0839.png)

Copy and paste `https://github.com/mendoza-research/cgmv-survey/` into the input box and click on *Import and Fork*.

![image](https://user-images.githubusercontent.com/1064036/118424402-cdd69180-b68c-11eb-868e-764bd35182f3.png)

This clones the repository and creates a live project (this usually takes a few minutes).

![image](https://user-images.githubusercontent.com/1064036/118424466-ec3c8d00-b68c-11eb-9ab7-d69183059657.png)

Once the container is ready, you'll see the "Background" page.

![image](https://user-images.githubusercontent.com/1064036/118424556-0d04e280-b68d-11eb-9dee-3cfb55a9c6b9.png)

Any changes you make will be updated in real-time.

![image](https://user-images.githubusercontent.com/1064036/118424979-d2e81080-b68d-11eb-9163-436dd1931358.png)

**If you're ready to commit the changes to the repository,** go to the GitHub tab on the left. Click on *Sign In* to connect your GitHub account.

![image](https://user-images.githubusercontent.com/1064036/118424847-96b4b000-b68d-11eb-8e78-5f620b1ad430.png)

Once signed in, click on *Link Sandbox*.

![image](https://user-images.githubusercontent.com/1064036/118425089-09be2680-b68e-11eb-8128-a7f4611703e6.png)

Add a brief summary of the changes and click on *Commit Changes* to push your changes.

![image](https://user-images.githubusercontent.com/1064036/118425185-425e0000-b68e-11eb-86fd-a61cf8b5f490.png)


## Animations 📽

You can adjust the animation duration by updating the `ANIMATION_DURATION` variable value in `survey-settings.ts` file. 

```typescript
// survey-settings.ts

// Gamification animation duration in milliseconds
// 2000 == 2 seconds
export const ANIMATION_DURATION = 2000;
```

## High-level architecture 🔭
![App Architecture](https://user-images.githubusercontent.com/1064036/116986338-47d14880-ac93-11eb-98df-e6493e35e530.png)

- This app is built with [Next.js](https://nextjs.org/). 
- Anything that the users see are deployed to Netlify.
- All data are recorded into a PostgreSQL database.
- [Hasura GraphQL engine](https://hasura.io/) is used to communicate between the app and the database.

## Continuous deployment requirements 🔨

All commits pushed to the `main` branch are automatically deployed to Netlify. If you wish to clone this repository and deploy it to a different Netlify proejct, please see below for the requirements.

### Netlify-related requirements 🧪

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
