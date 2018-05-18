// @flow
import * as Response from './responses';

export function isEditor(req: $Request, res: $Response, next: Function) {
    if (req.user.roles.includes('editor') || req.user.roles.includes('admin')) {
        return next();
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.AUTH_FAILED,
    }));
}

export const placeholder = '';
