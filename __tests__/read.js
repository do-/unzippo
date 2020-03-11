const zip = require ('../index.js')

test ('read', async () => {

	let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\r\n' +
	'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="3" uniqueCount="3"><si><t>one</t></si><si><t>two</t></si><si><t>three</t></si></sst>'
	
	expect (await zip.read ('./__data__/test.xlsx', 'xl/sharedStrings.xml')).toBe (xml)
	expect (await zip.read ('./__data__/test.xlsx', 'xl/sharedStrings.xml', 'utf8')).toBe (xml)
	expect (await zip.read ('./__data__/test.xlsx', 'xl/sharedStrings.xml', 'ucs2')).not.toBe (xml)
    
})