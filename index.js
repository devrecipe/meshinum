var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('meshinum.db3')
var args = process.argv.slice(2)

db.serialize(function() {
    switch (args[0]) {
        case 'nodes':
            nodes()
        break

        case 'services':
            services()
        break

        case 'storage':
            storage()
        break

        case 'logs':
            logs()
        break

        case 'version':
            console.log(`
  ___  ___          _     _                       
  |  \\/  |         | |   (_)                      
  | .  . | ___  ___| |__  _ _ __  _   _ _ __ ___  
  | |\\/| |/ _ \\/ __| '_ \\| | '_ \\| | | | '_ ' _ \\ 
  | |  | |  __/ (__| | | | | | | | |_| | | | | | |
  \\_|  |_/\\___|\\___|_| |_|_|_| |_|\\__,_|_| |_| |_|

  Version 1.0.0
  www.meshinum.com
            `);
        break;

        default:
            console.log('Command not found')
            console.log('Please run "meshinum help" to get list of available commands')
        break
    }

    function nodes() {
        switch (args[1]) {
            case 'monitor': break
            case 'suspend': break
            case 'resume': break
            case 'leave': break
            case 'join': break
            case 'info': break
            case 'list': break
            case 'logs': break
            case 'run': break

            default:
                invalid('nodes')
            break
        }
    }

    function services() {
        switch (args[1]) {
            case 'monitor': break
            case 'suspend': break
            case 'resume': break
            case 'create': break
            case 'delete': break
            case 'scale': break
            case 'info': break
            case 'list': break
            case 'logs': break

            default:
                invalid('services')
            break
        }
    }

    function storage() {
        switch (args[1]) {
            case 'set':
                if (args.length == 4) {
                    var key = args[2]
                    var value = args[3]
                    db.run(`INSERT INTO storage VALUES('${key}', '${value}')`)
                } else { invalid('storage') }
            break

            case 'get':
                if (args.length == 3) {
                    var key = args[2]
                    db.all(`SELECT value FROM storage WHERE key = '${key}'`, function(err, rows) {
                        if (rows.length == 0) console.log(`Key '${key}' does not exist`)
                        else console.log(rows[0].value)
                    })
                } else { invalid('storage') }
            break
            
            case 'sync': break
            
            case 'list':
                if (args.length == 2) {
                    console.log('KEY\t\tVALUE')
                    console.log('--------------------------------')
                    db.each(`SELECT * FROM storage`, function(err, row) {
                        console.log(`${row.key}\t\t${row.value}`)
                    })
                } else { invalid('storage') }
            break
            
            case 'clear':
                if (args.length == 2) {
                    db.run(`DELETE FROM storage`)
                    console.log('Storage is cleared')
                } else { invalid('storage') }
            break

            case 'delete':
                if (args.length == 3) {
                    var key = args[2]
                    db.all(`SELECT value FROM storage WHERE key = '${key}'`, function(err, rows) {
                        if (rows.length == 0) console.log(`Key '${key}' does not exist`)
                        else {
                            db.run(`DELETE FROM storage WHERE key = '${key}'`)
                            console.log(`Key '${key} is deleted'`)
                        }
                    })
                } else { invalid('storage') }
            break
            
            case 'export':
                console.log('This feature is still in development')
            break
            
            case 'import':
                console.log('This feature is still in development')
            break

            default:
                invalid('storage')
            break
        }
    }

    function logs() {

    }

    function invalid(command) {
        console.log('Command is invalid')
        console.log('Please run "meshinum ' + command + ' help" to get list of available commands')
    }
})