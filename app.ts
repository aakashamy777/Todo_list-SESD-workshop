import express from "express";
import { Routes } from "./src/utils/route.interface";
import { connect } from "mongoose";

class App {
  public app: express.Application;
  public port: number = 8080;

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.connectDatabase();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private async connectDatabase() {
    await connect(process.env.MONGODB_URI as string);
    console.log("Database connected");
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
