const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const db = require('./config')
const port = process.env.PORT || 5000

// READ USING GET
app.get("/", async (req, res) => {
    const snapshot = await db.collection('items').get();
    const list = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    res.send(list)
})

// CREATE USING POST
app.post("/create", async (req, res) => {
    const data = req.body
    const docRef = db.collection('items').doc();
    await docRef.set(data);
    res.send({ msg: "Item Added" })
})

// UPDATE USING POST
app.post("/update", async (req, res) => {
    const id = req.body.id
    delete req.body.id
    const docRef = db.collection('items').doc(id);
    await docRef.update(req.body);
    res.send({ msg: "Item Updated" })
})

// DELETE USING POST
app.post("/delete", async (req, res) => {
    const id = req.body.id
    const docRef = db.collection('items').doc(id);
    await docRef.delete();
    res.send({ msg: "Item Deleted" })
})

app.listen(port, () => {
    console.log(`Server is now listening at port: ${port}`)
})
