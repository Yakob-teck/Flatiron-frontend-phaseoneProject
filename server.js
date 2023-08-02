const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit-quote", (req, res) => {
  const { name, email, telephone, message } = req.body;
  const newQuote = {
    Name: name,
    email: email,
    Telephone: telephone,
    message: message,
  };

  // Read the existing data from db.json
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err);
      res.status(500).json({ error: "Failed to submit the quote." });
      return;
    }

    // Parse the existing data as JSON
    let quotes = JSON.parse(data);

    // Generate a unique id for the new quote
    const newId = quotes.length > 0 ? quotes[quotes.length - 1].id + 1 : 1;
    newQuote.id = newId;

    // Add the new quote to the array
    quotes.push(newQuote);

    // Write the updated data back to db.json
    fs.writeFile("db.json", JSON.stringify(quotes, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing to db.json:", err);
        res.status(500).json({ error: "Failed to submit the quote." });
        return;
      }

      console.log("Quote submitted successfully:", newQuote);
      res.json(newQuote);
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
