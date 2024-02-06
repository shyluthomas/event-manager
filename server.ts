import express from 'express';
// import * as compression from 'compression';
// import helmet from 'helmet';


export const startServer = () => {
    const port = process.env.PORT || 8044;
    const app = express();
    app.use(express.json());


    const server = app.listen(port, () => {
        console.log('server started..')
    })
    return app;
}