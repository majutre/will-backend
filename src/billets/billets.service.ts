import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BilletsService {
  sendBillet(data) {
    const URL = 'https://run.mocky.io/v3/0bca48f0-16db-4726-96a8-d4206306f698'
    return axios.post(URL, data).then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
