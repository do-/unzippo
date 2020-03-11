const zip = require ('../index.js')

it ('open missing entry', async () => {


//	expect (zip.open ('./__data__/test.xlsx', 'xxxl/sharedStrings.xml')).rejects.toThrow ()


	try {
		let s = await zip.open ('./__data__/test.xlsx', 'xxxl/sharedStrings.xml')
		expect (new Error ()).toBe ('We must not be here')
	}
	catch (x) {
		expect (x).toBe ('Entry not found')
	}


});