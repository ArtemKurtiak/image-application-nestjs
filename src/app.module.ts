import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ImageModule } from "./images/image.module";
import { FileModule } from "./file/file.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ImageModule,
    FileModule,
    MongooseModule.forRoot('mongodb://localhost:27017/images-app'),
  ]
})
export class AppModule {

}


