// import { collection } from './collection';
import { client } from './mongodb';

export const count = async () => {
		const c = await client;
	try {
		const db = c.db('call');
		const articles = db.collection('articles');
		const results = await articles.countDocuments();
		return results;
	} catch (e) {
        console.log('mongodb error', e);
        c.close()
	}
};
