import App from "./app";
import ExpenseRoutes from "./src/routes/expense.routes";
import "dotenv/config";

const app = new App([new ExpenseRoutes()]);
app.startServer();
