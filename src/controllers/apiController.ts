import { Request, Response } from 'express';
import pool from '../config/database';
import { Api } from '../models/apiModel';


export const createApi = async (req: Request, res: Response): Promise<void> => {
    const { company_name, method, path, description, username, body }: Api = req.body;

    try {
        const created_at = new Date(); // Current timestamp
        const result = await pool.query(
            'INSERT INTO apis (company_name, method, path, description, username, body, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [company_name, method, path, description, username, body, created_at]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getApis = async (req: Request, res: Response): Promise<void> => {
    const { company_name } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM apis WHERE company_name = $1',
            [company_name]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No logs found for this company' });
        } else {
            res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error('Error fetching logs for company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateApi = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { company_name, method, path, description, username, body }: Api = req.body;

    try {
        const result = await pool.query(
            'UPDATE apis SET company_name = $1, method = $2, path = $3, description = $4, username = $5, body = $6 WHERE id = $7 RETURNING *',
            [company_name, method, path, description, username, body, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'API not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error updating API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteApi = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM apis WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'API not found' });
        } else {
            res.status(200).json({ message: 'API deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
