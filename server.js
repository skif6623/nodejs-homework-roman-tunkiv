const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
	"mongodb+srv://skif6623:romanskif1994@cluster0.17oas5m.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000, () => {
			console.log("Database connection successfuljhfkld");
		});
	})
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
