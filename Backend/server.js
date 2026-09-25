require("dotenv").config();
const app = require("./src/app");
const createDB = require("./src/db/db")
createDB();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})