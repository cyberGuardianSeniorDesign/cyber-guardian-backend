const processFile = require("../upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");


// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "bucket-key.json" }); 
const bucket = storage.bucket("cyber-guardian-images");

exports.upload = async (req, res) => {
    
    try {
      await processFile(req, res);
      if (!req.files) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(req.files[0].fieldname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
  
      blobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });
  
      blobStream.on("finish", async (data) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
  
        try {
          // Make the file public
          await bucket.file(req.files[0].fieldname).makePublic();
        } catch (err){
            console.log(err)
          return res.status(500).send({
            message:
              `Uploaded the file successfully: ${req.files[0].originalname}, but public access is denied!`,
            url: publicUrl,
          });
        }
  
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.files[0].originalname,
          url: publicUrl,
        });
      });
  
      blobStream.end(req.files[0].buffer);
    } catch (err) {
        console.log(err)
      res.status(500).send({
        message: `Could not upload the file:. ${err}`,
      });
    }
  };
  
exports.download = async (req, res) => {
    try {
      const [metaData] = await bucket.file(req.params.name).getMetadata();
      res.redirect(metaData.mediaLink);
      
    } catch (err) {
        console.log(err)
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  };

  exports.delete = async (req, res) => {
    try {
        await bucket.file(req.params.name).delete()
        res.status(200).send({
            message: "File deleted"
        })
    } catch (err) {
        res.status(500).send({
            message: "Couldn't delete file " + err
        })
    }
  }