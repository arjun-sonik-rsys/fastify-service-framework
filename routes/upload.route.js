// routes/upload.route.js

export default async function (fastify) {
    // Multipart upload route
    fastify.post('/', async (req, reply) => {
      const parts = req.parts(); // Get multipart data
      let uploadedFile;
  
      // Handle file upload
      for await (const part of parts) {
        if (part.file) {
          uploadedFile = part; // Store the file part
        }
      }
  
      if (!uploadedFile) {
        return reply.code(400).send({ error: 'No file uploaded' });
      }
  
      return reply.send({
        fileName: uploadedFile.filename,
        fileSize: uploadedFile.file.length,
      });
    });
  }
  