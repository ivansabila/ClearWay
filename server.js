const dotenv = require("dotenv");
const app = require("./src/app.js");

dotenv.config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
