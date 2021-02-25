import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import { Application } from "express";
import { createConnection } from "typeorm";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.setupDatabase();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private async setupDatabase(): Promise<void> {
      await createConnection();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log("Server started on: " + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
