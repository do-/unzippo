const zip = require ('../index.js')

test ('list', async () => {
	
	expect ((await zip.list ('./__data__/test.xlsx')) ['[Content_Types].xml'].size).toBe (1440)
    
})