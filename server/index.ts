import feathers from "@feathersjs/feathers";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";
import "@feathersjs/transport-commons";
import { UserService } from "./services/User";
import { DepartmentService } from "./services/Department";
import { ChannelService } from "./services/Channel";
import { MessageService } from "./services/Message";

require( "dotenv" ).config();

const app = express( feathers() );

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ) );

app.configure( express.rest() );
app.configure( socketio() );

app.use( "/users", new UserService() );
app.use( "/departments", new DepartmentService() );
app.use( "/channels", new ChannelService() );
app.use( "/messages", new MessageService() );

app.use( express.errorHandler() );

app.on( "connection", connection =>
	app.channel( "everybody" ).join( connection )
);

app.publish( () => app.channel( "everybody" ) );

app.listen( 8000 ).on( "listening", () =>
	console.log( "Feathers server listening on localhost:8000" )
);
