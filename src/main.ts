import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const startApp = async () => {
  try {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
};

startApp();