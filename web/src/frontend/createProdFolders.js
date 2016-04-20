var fs = require("fs");

var createFolderIfItDoesntExist = function(folder) {
	fs.exists("../main/webapp/" + folder, function(exists) {
		if(!exists) {
			fs.mkdir("../main/webapp/" + folder)
		}
	})
}

createFolderIfItDoesntExist("styles");
createFolderIfItDoesntExist("vendor");