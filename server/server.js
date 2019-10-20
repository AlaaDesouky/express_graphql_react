const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const db = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

// Database config
const { mongodbURI } = require("./config/config");
(async () => {
  await db.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to database");
})();

// db.connect(mongodbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("Connected to database"));

// Graphql config
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

// Server setup
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
