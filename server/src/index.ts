import express, {Request, Response} from 'express';
const app = express();
const PORT = 8000;
import cors from 'cors';
import { Handle } from './manager/Manager';
import { Manager } from './manager/admin/Manager';
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json());

const handle = new Handle();

app.post("/api/add-saviour", (req: Request, res: Response) => {
    handle.addSaviour(req, res);
})

app.post("/api/save-me", (req: Request, res: Response) => {
    handle.saveMe(req, res);
})

const adminManager = new Manager();
app.post("/admin/api/add-saviour", (req: Request, res: Response) => {
    adminManager.addSaviour(req, res);
})

app.listen(PORT, () => {
    console.log("listening to port: ", PORT);
})

