import express from "express"
import session from "express-session"
import swaggerUi from "swagger-ui-express"
import { HttpStatusCode } from "./http/http-helper";
import apiRoutes from "./routes"
import swaggerDocs from "../docs/swagger.json"

const port = (process.env.PORT || 3000)

const app = express()
app.use(express.json())
app.use(session({
    secret: '[{-_-}] ZZZzz zz z...',
    resave: false,
    saveUninitialized: true,
}))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

app.use("/", apiRoutes)

app.listen(port, () => {
    console.info("Server is running at port: " + port);
});