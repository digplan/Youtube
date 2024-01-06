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
        if (!(id in data)) return false
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
    getPermissions(user) {
        // Get permissions from roles
    },
    login(name, pw) {
        const user = this.get(`Users:${name}`)
        if(!user) return '';
        return this.insert({_table: 'Tokens', user: name, permissions: this.getPermissions(user)}).token
    },
    logout(token) {
        this.delete(`Tokens:${token}`)
    },
    checkPermissions(token, operation) {
        // Get permissions from roles
    },
    createUser(username) {
        // return username
    }
}

export default o

o.wipe()
const username = o.createUser("user", "pass") // user
const token = o.login(username)  // token
o.insert(token, {}) // rec id
o.logout(token) // userid
o.insert(token)  // fail