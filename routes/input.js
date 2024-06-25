import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const checkCompletion = () => {
    const fileNames = ['A.txt', 'B.txt', 'C.txt', 'D.txt'];
    return fileNames.every(fileName => {
        const filePath = path.join(__dirname, `../${fileName}`);
        return fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').trim() !== '';
    });
};

const readFiles = () => {
    const fileNames = ['A.txt', 'B.txt', 'C.txt', 'D.txt'];
    const fileContents = {};

    fileNames.forEach((fileName) => {
        const filePath = path.join(__dirname, `../${fileName}`);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            fileContents[fileName] = content.split('\n').filter(line => line.trim() !== '');
        }
    });

    return fileContents;
};

router.post('/', (req, res) => {
    if (checkCompletion()) {
        return res.status(400).send('All files have received at least one number. No further input accepted.');
    }

    const { number } = req.body;

    if (typeof number !== 'number' || number < 1 || number > 25) {
        return res.status(400).send('Invalid input. Please enter a number between 1 and 25.');
    }

    const result = number * 7;

    let fileName;

    if (result > 140) {
        fileName = 'A.txt';
    } else if (result > 100) {
        fileName = 'B.txt';
    } else if (result > 60) {
        fileName = 'C.txt';
    } else {
        fileName = 'D.txt';
    }

    const filePath = path.join(__dirname, `../${fileName}`);

    // Append the original number and the result to the file
    fs.appendFileSync(filePath, number+"\n");
    res.send(`Result (${number}) saved to file ${fileName}`);
});

router.get('/list', (req, res) => {
    const fileContents = readFiles();
    res.send({
        message: 'Files contents retrieved successfully.',
        files: fileContents
    });
});

export default router;
