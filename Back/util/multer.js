import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const Dir = `uploads`

        const uploaDir = path.join(Dir)
        fs.mkdirSync(Dir, { recursive: true })

        req.uploaDir = uploaDir
        cb(null, uploaDir)
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        const fileName = `Emails${ext}`

        cb(null, fileName)
    }
})

const upload = multer({ storage,limits:{
    fileSize:1024 * 1024 * 5
},fileFilter:function(req,file,cb){
    console.log(file.mimetype)

   const types = [
  "text/plain",                             
  "text/csv",                                 
  "application/vnd.ms-excel",                 
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]

if (types.includes(file.mimetype)) {
  cb(null, true)
} else {
  cb(new Error("Apenas arquivos txt, csv, xls e xlsx são permitidos"), false)
}
}
 })

export default upload