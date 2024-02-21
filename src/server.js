const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.use("/", userRoutes)
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
