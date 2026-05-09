const MARKDOWN_MEDIA_TYPE = 'text/markdown';

function acceptsMarkdown(acceptHeader) {
	if (!acceptHeader) {
		return false;
	}

	return acceptHeader
		.split(',')
		.map((part) => part.trim().toLowerCase())
		.some((part) => {
			const [mediaType, ...params] = part.split(';').map((value) => value.trim());
			if (mediaType !== MARKDOWN_MEDIA_TYPE) {
				return false;
			}

			const quality = params.find((param) => param.startsWith('q='));
			return quality ? Number.parseFloat(quality.slice(2)) > 0 : true;
		});
}

export async function onRequest(context) {
	const { request } = context;
	const url = new URL(request.url);

	if (
		url.pathname === '/' &&
		(request.method === 'GET' || request.method === 'HEAD') &&
		acceptsMarkdown(request.headers.get('accept'))
	) {
		return context.next('/index.md');
	}

	return context.next();
}

