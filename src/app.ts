import express from 'express';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(8000, () =>
  console.log(`The server is listening on the port ${PORT}`)
);
