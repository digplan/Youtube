const data = await Bun.file("./db.json").json()
import schema from "./schema.toml"

const o = {
    async insert(rec) {
        this.validate(rec)
        data[rec._table + ":" + new Date().toISOString()] = rec
        this.save()
        return rec
    },
    async update(rec) {
        this.validate(rec) 
        if (!(rec._id in data)) throw new Error("record doesnt exist")
        data[rec._id] = rec
        this.save()
        return rec
    },
    get(id) {
        if (!(id in data)) return 'Not found'
        return JSON.stringify(data[id])
    },
    query(name) {

    },
    delete(id) {
        if(!(id in data)) throw new Error("id doesnt exist")
        delete data[id]
        this.save()
        return id
    },
    async save() {
        return await Bun.write('./db.json', JSON.stringify(data, null, 2))
    },
    validate(obj) {
        if(!obj._id || !obj._table) throw new Error("Obj must have _id and _table!")
        for (const k in schema[obj._table]) {
            console.log(k)
            if (!(k in obj)) throw new Error("field does not exist in schema")
        }
        return true
    }
}

export default o

console.log(o.insert({_id: 12, _table:"Tokens", user_id: "1", token: "0"}))

