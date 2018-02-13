// @flow
import neo4j from 'neo4j';
import containerized from 'containerized';

export function init(
    username? : string,
    password? : string,
    url? : string,
    port? : string | number,
) : void {
    const USERNAME = port || process.env.DB_USER || 'neo4j';
    const PASSWORD = password || process.env.DB_PASS || 'password';
    const URL = containerized() ? 'ragneo4j' : (url || process.env.DB_URL || 'localhost');
    const PORT = port || process.env.DB_PORT || 7474;
    this.raw = new neo4j.GraphDatabase(`http://${USERNAME}:${PASSWORD}@${URL}:${PORT}`);
}

export function cypher(query : string, params : Object) : Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        this.raw.cypher({
            query,
            params,
        }, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}
