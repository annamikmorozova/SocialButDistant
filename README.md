# SocialButDistant


Inspiration:
We were inspired by the challenges of COVID-19 where the only way we can see our friends is on zoom calls. Zoom meetings and google hangouts started to be a very regular thing as the weeks of quarantine went on. All of a sudden we were bombarded with links daily, and on the weekends, hourly. It felt like zoom links were being used up more than face masks and it was hard to keep track of them all.

What it does:
Manages currently going video meetings between friends or large groups of people. The entire site is based around the idea of having a single link that never changes but is always your key to your video conferences with your friends. Initially some one would create a group and pass out its link to those they wanted to have video conferences with. Those that received the link to the group could bookmark this link and return to it daily to go directly into the current video conference with out needing the new link for the new day. Anyone with the link has access to the video calls (no need to sign in!). We also optionally allow the group creator to set a secret word so the calls are not joined by randos. Once in the group with the link anybody can create a video conference in this group but that would require creating a login.

How I built it:
Made use of mongodb and google cloud platform to make a production ready nodejs express backend using no time at all. We kept the front end simple using bootstrap for css and ejs for template rendering.

Challenges I ran into:
Besides a couple of silly bugs that burnt up some time, the hack went over rather smoothly. One issue was waiting for Domain.com to update the DNS entries for our domain so that google cloud would verify it and we could use our new domain (socialbutdistant.online) on google cloud with HTTPS SSL. Unfortunately, at submission time it still hasn't verified. Though, the google sub domain is not that bad either (social-but-distant.ue.r.appspot.com) and has turn key SSL.

Accomplishments that I'm proud of:
Having an actual production ready deployed site. Google app engine made it way easier than I was expecting. Usually you are demoing off of local host at the end of a hackathon because you tried but failed or only got it out half way before you got real stuck. Not this time! Also we were both pretty new to the nodejs and mongo stack but luckily it all just clicked and didnt get stuck too long on anything.

What I learned:
Learned and loved ejs templates. It makes it easier to render html files in logical a modular way. Also learned that mongodb and google cloud platform is definitely the move for a hackathon because of its ease of use.

What's next for SocialButDistant:
The site still needs a little bit more work to make it a fully functioning site. Would need to add pages and routes for the boring stuff like general settings, reset password etc. But besides that we could probably start making our friends use it right away!

Built with:
Express.js, Node.js, MongoDB, ejs, HTML, CSS, Bootstrap, Font-Awesome, google-app-engine, google-cloud
