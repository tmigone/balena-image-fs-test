import { interact } from 'balena-image-fs';
import { promisify } from 'util';
import path from 'path';

(async () => {
	const OS_IMAGE = path.join(__dirname, 'balena.img');
	const PARTITION_INDEX = 6; // resin-data is 6

	await interact(OS_IMAGE, PARTITION_INDEX, async (_fs) => {
		const readdirAsync = promisify(_fs.readdir);
		const mkdirAsync = promisify(_fs.mkdir);

		await mkdirAsync(`/test-${Date.now()}`);
		const dirs = await readdirAsync('/');
		console.log(dirs);

		const success = dirs.some((d) => d.includes('test'));
		console.log(`Test: ${success ? 'ok' : 'failed'}`);
	});
})();
