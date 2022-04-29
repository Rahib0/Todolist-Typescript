import db from './config'
import fs from 'fs'
import 'dotenv/config'

const seeds = fs.readFileSync(__dirname + '/_seeds.sql').toString();
// tslint:disable-next-line:no-console
db.query(seeds, () => console.log('Dev database seeded!'));