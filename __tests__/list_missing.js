const zip = require ('../index.js')

it ('list missing zip', async () => {

    await expect (zip.list ('./__data__/test.xxx')).rejects.toThrow ()
    
});