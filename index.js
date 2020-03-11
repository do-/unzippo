const StreamZip = require ('node-stream-zip'), x = module.exports = {}

x.close = zip => {

	try {
	    zip.close ()
	}
	catch (x) {
		// do nothing
	}
	
	return 1
	
}

x.process = async (file, get) => {

	let zip = new StreamZip ({file})
	
	try {

		return await new Promise ((ok, fail) => {

			zip
				.on ('error', fail)
				.on ('ready', async () => ok (get (zip)))

		})
	
	}
	finally {
	
		x.close (zip)
	
	}

}

x.list = async (fn) => x.process (fn, zip => zip.entries ())

x.get  = async (fn, path) => x.process (fn, zip => zip.entryDataSync (path))

x.read = async (fn, path, encoding) => (await x.get (fn, path)).toString (encoding)

x.open = async (file, path) => {

	const zip = new StreamZip ({file}), clean_up = () => x.close (zip)
	
	return new Promise ((ok, report) => {	
	
		const confess = problem => clean_up () && report (problem)
	
		zip.on ('error', confess).on ('ready', () => {
		
			zip.stream (path, (problem, stream) => {

				problem ? confess (problem) :

				ok (stream.on ('end', clean_up).on ('close', clean_up))

			})
		
		})

	})

}