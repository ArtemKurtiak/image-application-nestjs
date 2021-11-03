import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as uuid from 'uuid';
import * as fs from "fs";
import * as util from 'util';

const writeFilePromise = util.promisify(fs.writeFile);

@Injectable()
export class FileService {
  async createFile(file: any) {
    try {
      const fileName = `${uuid.v4()}${path.extname(file[0].originalname)}`;

      const filePath = path.resolve(__dirname, '..', 'static');

      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      await writeFilePromise(path.resolve(filePath, fileName), file[0].buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}