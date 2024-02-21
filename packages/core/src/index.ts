import * as fs from 'fs'
import path from 'path'
import { post } from './request'
import FormData from 'form-data'
interface fileConfig {
  fileName: string
  filePath: string
}
function getAllFiles (dir: string, fileList: fileConfig[] = []): fileConfig[] {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList) // 递归处理子目录
    } else {
      fileList.push({ fileName: file, filePath }) // 将文件路径添加到数组
    }
  })

  return fileList
}

interface UploadMapFileParams {
  directoryPath: string
  appId: string
  appKey: string
}

export const uploadMapFile = async (
  params: UploadMapFileParams
): Promise<any> => {
  const { directoryPath, appId, appKey } = params

  const files = getAllFiles(directoryPath)

  const mapFiles = files.filter(
    ({ fileName }) => path.extname(fileName) === '.map'
  )

  // 创建一个 FormData 对象
  const form = new FormData()

  mapFiles.forEach(({ filePath, fileName }) => {
    form.append(fileName, fs.createReadStream(filePath))
  })

  await post(
    `http://weiwei8848.com:7001/plugin/upload?appId=${appId}&appKey=${appKey}`,
    form
  )

  console.log(
    '-------- 上传成功---------- 共' + mapFiles.length + '个文件'
  )
}
