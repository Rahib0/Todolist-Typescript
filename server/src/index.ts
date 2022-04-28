import { server } from "./server"

const port = process.env.PORT || 3000;

server.listen(port, () =>
    // tslint:disable-next-line:no-console
    console.log(`\n Express departing now from http://localhost:${port} \n`)
);
