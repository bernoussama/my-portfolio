import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.woff2': 'font/woff2',
	'.svg': 'image/svg+xml',
};

/**
 * @param {{ port?: number; root?: string }} [options]
 * @returns {Promise<{ baseURL: string; close: () => Promise<void> }>}
 */
export async function startStaticServer(options = {}) {
	const port = options.port ?? 4173;
	const root = options.root ?? fileURLToPath(new URL('../../dist', import.meta.url));

	const server = http.createServer((req, res) => {
		let urlPath = new URL(req.url ?? '/', 'http://127.0.0.1').pathname;
		if (urlPath.endsWith('/')) urlPath += 'index.html';

		const filePath = path.normalize(path.join(root, urlPath));
		if (!filePath.startsWith(root)) {
			res.writeHead(403);
			res.end();
			return;
		}

		fs.readFile(filePath, (error, data) => {
			if (error) {
				res.writeHead(404);
				res.end();
				return;
			}

			const ext = path.extname(filePath);
			res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
			res.end(data);
		});
	});

	await new Promise((resolve, reject) => {
		server.once('error', reject);
		server.listen(port, '127.0.0.1', resolve);
	});

	const baseURL = `http://127.0.0.1:${port}`;
	return {
		baseURL,
		close: () =>
			new Promise((resolve, reject) => {
				server.close((error) => (error ? reject(error) : resolve()));
			}),
	};
}