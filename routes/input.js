import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

let filesWritten = {
    A: false,
    B: false,
    C: false,
    D: false
};

const checkCompletion = () => {
    return Object.values(filesWritten).every(value => value === true);
};

router.post('/', (req, res) => {
    const { number } = req.body;

    if (typeof number !== 'number' || number < 1 || number > 25) {
        return res.status(400).send('Invalid input. Please enter a number between 1 and 25.');
    }

    const result = number * 7;

    let fileName;

    if (result > 140) {
        fileName = 'A.txt';
        filesWritten.A = true;
    } else if (result > 100) {
        fileName = 'B.txt';
        filesWritten.B = true;
    } else if (result > 60) {
        fileName = 'C.txt';
        filesWritten.C = true;
    } else {
        fileName = 'D.txt';
        filesWritten.D = true;
    }

    const filePath = path.join(__dirname, `../${fileName}`);
    
    // Append the result to the file
    fs.appendFileSync(filePath, result.toString() + '\n', 'utf8');
    res.send(`Result (${result}) saved to file ${fileName}`);

    if (checkCompletion()) {
        console.log('All files have been written to. No further input accepted.');
        process.exit();
    }
});

export default router;