let data = await Bun.file("./db.json").json()
import schema from "./schema.toml"

const o = {
    async insert(rec) {
        const pk = this.validate(rec)
        data[pk] = rec
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
        return ""
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
    async wipe() {
        data = {}
        this.save()
    },
    generateKey() {
        return +new Date() + Math.random()
    },
    validate(rec) {
        if(!rec._table) 
            throw new Error("Obj must have _table!")
        console.log(schema.WatchLater)
        const {fields, attributes} = schema[rec._table]
        for (const field in fields) {
            if (field === attributes.generate_primary_key)
                rec[field] = this.generateKey()
            if (!rec.hasOwnProperty(field)) 
                throw new Error(`field ${field} does not exist in schema ${rec._table}`)
        }
        return `${rec._table}:${rec[attributes.primary_key]}`
    },
    login(name, pw) {

    },
    logout(token) {

    },

}

export default o

o.wipe()
o.insert({_table: "WatchLater", user_id: "1", video_id: "1", added_date: new Date().toISOString()})