# TinyLottery

A simple lottery application for Meetup.com.

## How to use

Meetup.com is a popular website to organize local community events. Sometimes it would be fun if there is a lucky draw for attendees at the end of the meetup. So I developed this tool to set a lucky draw.

### Installing Node.js and Angular CLI

It is supposed that you have `Node.js` and `Angular` CLI installed on your laptop. For more information about `Angular`, please visit https://angular.io, or open [this link](/tiny-lottery).

Install `Node.js` from https://nodejs.org/en/. After installing `Node.js`, you can use `npm` to install `Angular CLI` by running this command:

```bash
npm install -g @angular/cli
```

### Getting attendees data

First, get the attendees' data from meetup.com. Download the attendees' data as an Excel file. Copy the name column and use ChatGPT to generate a JSON file like this:

```json
{
  "data": [
    { "name": "User 1" },
    { "name": "User 2" },
    { "name": "User 3" }
    ]
}
```

Copy the content and save it as a JSON file called `attendees.json` in the `assets` folder.

### Clone and build the project on your laptop

Clone the project and navigate to the `tiny-lottery` folder. Run the following command to install the packages:

```bash
npm install --force
```

Then use the command below to run it:

```bash
ng serve --open
```

That's it!

![image](/tiny-lottery.gif)

## Contact me

yan_xiaodi{at}hotmail.com
