const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const weatherRoute = require("./routes/weather");
app.use("/weather", weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Weather server running on port ${PORT}`);
});
