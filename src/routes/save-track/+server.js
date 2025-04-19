// src/routes/save-track/+server.js
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('static/tracks.json');

export async function POST({ request }) {
	const track = await request.json();

	let existingData = [];

	if (fs.existsSync(filePath)) {
		const raw = fs.readFileSync(filePath, 'utf-8');
		try {
			existingData = JSON.parse(raw);
		} catch {
			existingData = [];
		}
	}

	existingData.push(track);

	fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

	return json({ status: 'success', message: 'Track saved!' });
}
