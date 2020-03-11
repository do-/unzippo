const zip = require ('../index.js')

test ('open', async () => {

	let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\r\n' +
	'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="3" uniqueCount="3"><si><t>one</t></si><si><t>two</t></si><si><t>three</t></si></sst>'

	let is = await zip.open ('./__data__/test.xlsx', 'xl/sharedStrings.xml')	
	
	let ss = await new Promise ((ok, fail) => {
	
		let s = ''; is
			.on ('error', fail)
			.on ('end', () => ok (s))
			.on ('data', c => s += c)
	
	})

	expect (ss).toBe (xml)
    
})