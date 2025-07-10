let express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  database = require("./database"),
  bodyParser = require("body-parser"),
  createError = require("http-errors"),
  swaggerUi = require("swagger-ui-express"),
  swaggerJsdoc = require("swagger-jsdoc");

mongoose.Promise = global.Promise;
mongoose
  .connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
const studentAPI = require("../backend/routes/student.route");

// 🔹 Swagger konfiguracija
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student API",
      version: "1.0.0",
      description: "API za upravljanje studentima",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger traži anotacije u ruti
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔹 Parsiranje body-a i CORS
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔹 API ruta
app.use("/api", studentAPI);

// 🔹 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// 🔹 Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// 🔹 Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});
