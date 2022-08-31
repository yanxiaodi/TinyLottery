# TinyLottery
A simple lottery application for Meetup.com.

## How to use
Meetup.com is a popular website to organize local community events. Sometimes it would be fun if there is a lucky draw for attendees at the end of the meetup. So I developed this tool to set a lucky draw.

### Installing Node.js and Angular CLI
It is supposed that you have `Node.js` and `Angular` CLI installed on your laptop. For more information about `Angular`, please visit https://angular.io, or open [this link](/tiny-lottery).

### Getting attendees data
First, get the attendees' data from meetup.com. Use Chrome and open your event page. On this page, you can find a section called `Attendees`. Click the link `Manage` to open the attendees' page. The URL is like this: https://www.meetup.com/{your-organization-name}/events/{event-id}/attendees/. You can see all the attendees here.

Press `F12` to enable developer tools and navigate to `Network` tab. Then press `F5` to refresh the page. In the `Network` window, you can find requests about attendees' data. Find the correct one. Usually, it should start with `https://www.meetup.com/mu_api/urlname/events/eventId/attendees?queries=%28endpoint%3A{you-organization-name}...`. Click `Response` tab, now you can get all attendees' data. Copy the content and save it as a JSON file called `attendees.json`;

### Clone and build the project on your laptop
It would be better if I integrate the meetup login system and publish it as a website. But it is also very easy to use on your laptop. Clone the project and navigate to the `tiny-lottery` folder. Copy the `attendees.json` file and paste it into the `assets` folder.

Run this command to install the packages:

```bash
npm install
```

Then use the command below to run it:

```bash
ng serve --open
```

That's it!

![image](/tiny-lottery.gif)

## Contact me
yan_xiaodi{at}hotmail.com
