import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions
} from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import { Tooltip } from 'primereact/tooltip'
import * as XLSX from 'xlsx'
import { isExpense } from '../../utils'
import { Expense, ServerExpense } from '../../types/expenses'

interface Props {
  extensionsAccepted: string
  maxFileSize: number

}

export default function UploadFile(props: Props) {
  const [data, setData] = useState<unknown[]>(null)
  const toast = useRef<Toast>(null)
  const [totalSize, setTotalSize] = useState(0)
  const fileUploadRef = useRef<FileUpload>(null)

  function formatUploadData(dataReceived: unknown[]): ServerExpense[] {
    if (!dataReceived || !dataReceived.length) throw Error('No hay información recibida')

    const firstRow = dataReceived[0]

    if (!isExpense(firstRow)) throw Error('Las columnas no están bien nombradas')

    const expensesDraft: ServerExpense[] = []
    const foreignData = {
      'categories': {},
      'subCategories': {},
      'tags': {},
      'paymentMethods': {}
    }

    for (const expense of (dataReceived as Expense[])) {
      const { category, subCategory, tags, paymentMethod } = expense
      if (category && foreignData.categories[category] === undefined) {
        //query category
      }

      if (subCategory && foreignData.subCategories[subCategory] === undefined) {
        //query category
      }

      if (tags && foreignData.tags[tags] === undefined) {
        //query category
      }

      if (paymentMethod && foreignData.paymentMethods[paymentMethod] === undefined) {
        //query category
      }
    }

    return expensesDraft
  }
  
  function handleFileUpload(e: FileUploadSelectEvent) {
    const file = e.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[3];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
    };

    reader.readAsBinaryString(file);
  }

  function onTemplateSelect(e: FileUploadSelectEvent) {
    const files = e.files
    let _totalSize = totalSize

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0
    }

    setTotalSize(_totalSize)
    handleFileUpload(e)
  }

  function onTemplateUpload(e: FileUploadUploadEvent) {
    let _totalSize = 0

    e.files.forEach((file) => {
      _totalSize += file.size || 0
    })

    setTotalSize(_totalSize)
    toast.current?.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded'
    })
  }

  function onTemplateRemove(file: File, callback: () => void) {
    setTotalSize(totalSize - file.size)
    callback()
  }

  function onTemplateClear() {
    setTotalSize(0)
  }

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / 10000
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B'

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className='flex align-items-center gap-3 ml-auto'>
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: '10rem', height: '12px' }}
          ></ProgressBar>
        </div>
      </div>
    )
  }

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File
    return (
      <div className='flex align-items-center flex-wrap'>
        <div className='flex flex-col align-items-center' style={{ width: '40%' }}>
          <small className='flex flex-column text-left text-gray-400 ml-3'>
            {file.name}
          </small>
          <img
            alt={file.name}
            role='presentation'
            src={file.objectURL}
            width={100}
          />
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div className='flex align-items-center flex-column'>
        <i
          className='pi pi-image mt-3 p-5'
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)'
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className='my-5'
        >
          Drag and Drop Image Here
        </span>
      </div>
    )
  }

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined'
  }
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
  }
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
  }

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target='.custom-choose-btn' content='Choose' position='bottom' />
      <Tooltip target='.custom-upload-btn' content='Upload' position='bottom' />
      <Tooltip target='.custom-cancel-btn' content='Clear' position='bottom' />

      <FileUpload
        ref={fileUploadRef}
        name='demo[]'
        url='/api/upload'
        multiple
        accept={props.extensionsAccepted}
        maxFileSize={props.maxFileSize}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  )
}
