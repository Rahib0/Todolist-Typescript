import db from './config'
import fs from 'fs'
import 'dotenv/config'

const seeds = fs.readFileSync(__dirname + '/_migrations.sql').toString();
// tslint:disable-next-line:no-console
db.query(seeds, () => console.log('database has been migrated!'));