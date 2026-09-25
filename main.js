import express from "express"
import catalogRoutes from "./routes/catalog.routes.js"
import catalogApiRoutes from "./api/routes/catalog.routes.js"
import productoraApiRoutes from "./api/routes/productora.routes.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(productoraApiRoutes)

app.use(catalogRoutes)
app.use(catalogApiRoutes)

app.listen(3333, () => console.log("Funcionando..."))
