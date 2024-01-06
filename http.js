import DB from './data/database.mjs'

export default {
    port: 3000,
    async fetch(req) {
        let path = new URL(req.url).pathname
        if (path == '/') path = 'index.html'
        if (path != '/api') return new Response(Bun.file(`public/${path}`))
        switch(req.method) {
            case 'GET':
                if(path.match(":")) return new Response(DB.get(path))
                else return new Response(DB.query(path))
            case 'POST':
                return Response.json(DB.insert(await req.json()))
            case 'PUT':
                return Response.json(DB.update(await req.json()))
            case 'DELETE':
                return Response.json(DB.delete(path))
         }
    }
}

console.log('Running on 3000')