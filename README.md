# Band Together

A platform for musicians to connect with others!

<img width="600" height="689" alt="Screenshot 2026-05-06 at 9 02 38 PM" src="https://github.com/user-attachments/assets/9f215425-ae3d-4740-97bf-c08513c5d09a" />

<br>

One of the biggest problems with forming a band is finding the right musicians to play with. Finding, say, a drummer that knows how to play metal? Pretty difficult without knowing someone right off the bat. That is why BandTogether aims to fix that problem 

## Create a Profile

<img width="1156" height="708" alt="Screenshot 2026-05-06 at 9 04 15 PM" src="https://github.com/user-attachments/assets/3a91efe0-5e63-4c72-9c97-e03f66ddbc5d" />

<br>
Create a profile and upload your own music! Here, you can specify which genres you like, what instruments you play, and of course where you are located. 

<br> 

### Example of Profile Edit Screen

<img width="936" height="563" alt="Screenshot 2026-05-06 at 9 06 24 PM" src="https://github.com/user-attachments/assets/e1a193b0-dc37-463d-a4b8-23aec7f72272" />


## Connect with Other Musicians

<img width="1057" height="750" alt="Screenshot 2026-05-06 at 9 08 03 PM" src="https://github.com/user-attachments/assets/ac39c284-b043-431d-832c-8f553f486bec" />

<br>

Here, find musicians based on your perferences. Whether you need a singer that can sing opera or a guitarist that can play bachata, here you can find anyone!

## Find Performances

<img width="1416" height="606" alt="Screenshot 2026-05-06 at 9 09 35 PM" src="https://github.com/user-attachments/assets/17e0d9e9-ad0e-4bfe-9c1c-550c2c848b56" />

Find performances in your area! Local bands can upload concert dates and locations for others.

## Of course, music!

<img width="1441" height="680" alt="Screenshot 2026-05-06 at 9 10 21 PM" src="https://github.com/user-attachments/assets/aa0b354c-4e00-4bb8-a7c2-745985433dba" />

<br>

Find songs made by musicians and users! Links go to spotify and anyone can upload their track information to gain more outreach.

# How To Run

```bash
cd bandtogetherv3
pnpm install
```

All dependencies are in the package.json file. Website was made with TS + React + Vite for front-end, Express + Node.js + Firebase for back-end. 

## NOTE:
Because I used firebase for storing data, the website will unfortunately not fully work without the proper API keys (which I could not obviously upload to GitHub). That being said, if you want to run the site, create a firebase project on your own and create an .env file with these varaibles and fill them out based on your own firebase project:

`VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECTID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDERID=...
VITE_FIREBASE_APPID=...
VITE_FIREBASE_MEASUREMENTID=...`

Otherwise, email me at matthewizaguirre58@gmail.com (only for the sake of the project with people that I trust and know) for the .env file to run the site.













