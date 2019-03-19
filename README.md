# Matomo scrape

This document outlines the steps to export the NPR radio show podcast stats from the Hub as well as feedback.

## Prerequisites

To run the script and format the stats you’ll need:

1. **Access to production environment:** connected via ssh tunnel to the cloud gateway so the app to works

2. **PIWIK token**: Log in to PIWIK (via ssh tunnel). Select the person icon (towards the top right), this takes you to your personal settings. Click the API option on the left hand panel to access the user authentication token

3) **Node & npm:** Instructions to [install node and npm](https://nodejs.org/en/)

## App setup

Download the app on this page into a directory on your computer, then:

open a terminal session
move into the directory where you downloaded the app to
run the following commands

```bash

npm install

```

Create an environment file to which to store urls in

```bash
cp .env.example .env
```

Then replace the value with the correct ones in the created `.env file`

## Getting your data

To download feedback stats for the respective prison you will need to run the following command.

> Before you run this command make sure you are ssh'd in the the production bounce box of the representative establishment

```bash
./bin/feedback_stats START_DATE,END_DATE ESTABLISHMENT_NAME

e.g.
START_DATE=2019-03-15
END_DATE=2019-03-25
ESTABLISHMENT_NAME=berwyn | wayland

./bin/feedback_stats 2019-03-15,2019-03-25 berwyn
```

Downloading the NPR stats is similar to downloading the feedback stats.

> Before you run this command make sure you are ssh'd in the the production bounce box of the representative establishment

```bash
./bin/npr_stats 2019-03-15,2019-03-25 berwyn
```

Once you've run either command you should be able to find your file in the `csv-exports` folder.
