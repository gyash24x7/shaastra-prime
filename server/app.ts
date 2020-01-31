import path from "path";
import favicon from "serve-favicon";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";

import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";

import { Application } from "./types";
import services from "./services";
import channels from "./channels";
import auth from "./auth";

const app: Application = express(feathers());

app.configure(configuration());

app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));

app.configure(express.rest());
app.configure(socketio());

app.configure(auth);
app.configure(services);
app.configure(channels);

app.use(express.notFound());
app.use(express.errorHandler());

export default app;
