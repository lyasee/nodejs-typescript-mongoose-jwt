import * as express from 'express';
import * as bodyParser from 'body-parser'; // used to parse the form data that you pass in the request
import apiRoute from './routes';
import * as cors from 'cors';
import {mongodb} from './config/database';
import {initialize} from 'passport';
import {passportInit} from './auth/passport';

class App {
  public app: express.Application;

  constructor() {
    this.app = express(); // run the express instance and store in app
    this.config();
    this.connect();
    this.passport();
  }

  private config(): void {
    this.app.use(cors());
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    this.app.use('/api', apiRoute.route);
    this.app.use(initialize());
  }

  private connect(): void {
    mongodb();
  }

  private passport(): void {
    passportInit();
  }
}

export default new App().app;
