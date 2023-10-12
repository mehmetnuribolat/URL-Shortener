import Logger from './core/Logger';
import { port } from './configuration/config';
import app from './app';

app.listen(port, () => {
    Logger.info(`Server is running on port : ${port}`);
})
.on('error', (e: Error) => Logger.error(e));