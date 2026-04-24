import express from 'express';
const app = express();
const port = 3000;

app.use(express.json())

/*
Here is an outline for the API routes I intend to use. NOTE: Everything here is a placeholder
and does not function. The key idea I want to implement is each user/band has a calendar displayed on their page with upcoming 
performance dates, music releases, or other events. Because each user/band has their own unique possible calendar, rather than tethering everything to a 
Google Calendar API implementation, I'll see if I can store data in a database where data is fetched or updated.
*/

/* GET (Placeholder for now)
When a vistor looks at someone's profile the data should be fetched where the calendar events matches the profile ID
*/

app.get('./', (req, res) =>{
    //
    res.status(200).json({message: "GET Request: Calendar received"})
})

/*
POST (Placeholder)
Creates a new event on the calendar
*/
app.post("./", (req, res) =>{
    const newDate = req.body;

    res.status(201).json({message: "POST"})
})

/*
PUT (Placeholder)
Updates an event on a calendar
*/
app.put("./", (req, res) =>{
    const updatedDate = req.params;

    res.status(200).json({message: "PUT"})
})

/*
DELETE (Placeholder)
Deletes an event in the calendar
*/
app.delete("./", (req, res) =>{
    const date = req.params;

    res.status(200).json({message: "DELETE"})
})

app.listen(port, () =>{
    console.log("Server is running!")
})