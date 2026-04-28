import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin'
import serviceAccount from '../bandtogether-adminSDK.json' with { type: 'json' };

/*
NOTE: The idea for the routes have changed. Though I implemented the server to make requests to FireBase, I think I might make it more to fetch and update
user data rather than calendar dates. Luckily the server requests work, so I can start from there. The original outline is commented out just so I have access to it just in case
(more so the idea)
*/
 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})
const db = admin.firestore();

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", async (req, res) =>{
    try{
    const snapshot = await db.collection('Users').get();
    const list = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
    console.log(list)
    res.send(list);
    } catch (error) {
        res.status(500).send({msg: "Failed to get all users"})
    }

})


app.post("/profile", async(req, res) =>{
    try{
        const data = req.body;
        await db.collection('Users').add(data);
        res.send({msg: "User added"})
    } catch (error){
        res.status(500).send({msg: "Failed to update user"})
    }
})

app.delete("/profile:id", async(req, res) =>{
    try{
        const docID = req.params.id;
        await db.collection('Users').doc(docID).delete();
        res.send({msg: "User deleted"})
    }
    catch{
        res.status(500).send({msg: "Failed to delete user, error"})
    }
})

app.put("/profile/:id", async (req, res) => {
    try {
        const docID = req.params.id;
        const updatedData = req.body;
        await db.collection('Users').doc(docID).update(updatedData);
        res.send({ msg: "User updated" });
    } catch (error) {
        res.status(500).send({ msg: "Failed to update user", error });
    }
});



app.listen(3000, () => console.log("Up and Running on 3000"))

/*
Here is an outline for the API routes I intend to use. NOTE: Everything here is a placeholder
and does not function. The key idea I want to implement is each user/band has a calendar displayed on their page with upcoming 
performance dates, music releases, or other events. Because each user/band has their own unique possible calendar, rather than tethering everything to a 
Google Calendar API implementation, I'll see if I can store data in a database where data is fetched or updated.
*/

/* GET (Placeholder for now)
When a vistor looks at someone's profile the data should be fetched where the calendar events matches the profile ID
*/

// app.get('./', (req, res) =>{
//     //
//     res.status(200).json({message: "GET Request: Calendar received"})
// })

// /*
// POST (Placeholder)
// Creates a new event on the calendar
// */
// app.post("./", (req, res) =>{
//     const newDate = req.body;

//     res.status(201).json({message: "POST"})
// })

// /*
// PUT (Placeholder)
// Updates an event on a calendar
// */
// app.put("./", (req, res) =>{
//     const updatedDate = req.params;

//     res.status(200).json({message: "PUT"})
// })

// /*
// DELETE (Placeholder)
// Deletes an event in the calendar
// */
// app.delete("./", (req, res) =>{
//     const date = req.params;

//     res.status(200).json({message: "DELETE"})
// })

// app.listen(port, () =>{
//     console.log("Server is running!")
// })


