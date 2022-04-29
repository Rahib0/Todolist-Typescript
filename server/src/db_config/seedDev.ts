import { pool as db } from './config'
import fs from 'fs'


const seeds = fs.readFileSync(__dirname + '../../_seeds.sql').toString();
// tslint:disable-next-line:no-console
db.query(seeds, () => console.log('Dev database seeded'));