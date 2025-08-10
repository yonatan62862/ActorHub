import fs from 'fs';
import path from 'path';
import { CommentRecord } from '../models/commentModel';


const COMMENTS_FILE = path.resolve(__dirname, '../../data/comments.txt');


const addComment = async (id: number, comment: string): Promise<CommentRecord> => {
  const record: CommentRecord = { id, comment };
  const line = JSON.stringify(record) + '\n';
  await fs.promises.appendFile(COMMENTS_FILE, line, 'utf8');
  return record;
};


const getAllComments = async (): Promise<CommentRecord[]> => {
  const content = await fs.promises.readFile(COMMENTS_FILE, 'utf8');
  return content
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => JSON.parse(line) as CommentRecord);
};

export { addComment, getAllComments };