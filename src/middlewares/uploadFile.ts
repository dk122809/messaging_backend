// import path from "path";
// import fs from "fs-extra";
// import httpStatus from "http-status";

// const uploadFile = (req, res, next) => {
//   try {
//     const uploadPath = path.join(__dirname, "../../upload");
//     req.pipe(req.busboy); // Pipe it trough busboy

//     req.busboy.on("field", (fieldname, value) => {
//       console.log(`Upload of '${value}' started`);
//       console.log(fieldname, "nam", value)
//       req.body[fieldname] = value

//       // Create a write stream of the new file
//     //   const fstream = fs.createWriteStream(path.join(uploadPath, filename));
//     //   // Pipe it trough
//     //   file.pipe(fstream);

//     //   // On finish of the upload
//     //   fstream.on("close", () => {
//     //     console.log(`Upload of '${filename}' finished`);
//     //     return next();
//     //   });
//     return next();
//     });

//   } catch (err) {
//     const payload = {
//       statusCode: httpStatus.BAD_REQUEST,
//       status: false,
//       message: err.message,
//     };
//     return next(payload);
//   }
// };

// export default uploadFile;
