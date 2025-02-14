const zip = require ('../index.js')

it ('open missing entry', async () => {

	await expect (() => zip.open ('./__data__/test.xlsx', 'xxxl/sharedStrings.xml')).rejects.toEqual (Error ('Entry not found'))

})