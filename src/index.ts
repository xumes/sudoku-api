import express from "express"
import { HttpStatusCode } from "./http/http-helper";
import apiRoutes from "./routes"

const port = (process.env.PORT || 3000)

const app = express()

app.get('/status', (req, res) => {
    const hc = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try {
        res.status(HttpStatusCode.OK).json(hc)
    } catch (e) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end()
    }
})

app.get("/", apiRoutes)


app.listen(port, () => {
    console.info("Server is running at port: " + port);
});