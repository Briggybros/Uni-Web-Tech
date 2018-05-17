// @flow
import DynamicContent from './DynamicContent';

export default class Page extends DynamicContent {
    static getPage(id: string): Promise<Page> {
        return DynamicContent.getContent(id)
            .then(data => new Page(
                data.id,
                JSON.parse(data.content),
                data.published,
                'PAGE',
                JSON.parse(data.meta),
            ));
    }
}
