import { useEffect, useRef, useState } from 'react'
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  ItemTemplateOptions
} from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import { Tooltip } from 'primereact/tooltip'
import * as XLSX from 'xlsx'
import { ServerExpense } from '../../types/expenses'
import useExpense from '../../hooks/use-expense'
import { toast } from 'sonner'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useNavigate } from 'react-router-dom'

interface Props {
  extensionsAccepted: string
  maxFileSize: number

}

export default function UploadFile(props: Props) {
  const [totalSize, setTotalSize] = useState(0)
  const [ data, setData ] = useState<ServerExpense[]>([])
  const[ isLoading, setLoading ] = useState<boolean>(false)
  const fileUploadRef = useRef<FileUpload>(null)
  const { expensesPostMutation, formatExpensesForUpload  } = useExpense()
  const navigate = useNavigate()
  
  async function handleFileUpload(e: FileUploadSelectEvent) {
    const file = e.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        setLoading(true)
        const formattedData = await formatExpensesForUpload(sheetData)
        setData(formattedData)
      } catch (error) {
        console.error(error)
        toast.error(error)
        setData([])
      } finally {
        setLoading(false)
      }
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

  function onTemplateClear() {
    setTotalSize(0)
  }

  async function uploadHandler() {
    if (data && data.length) expensesPostMutation.mutate(data)
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

    if (isLoading || expensesPostMutation.isLoading) return (
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    )

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

  useEffect(() => {
    if (expensesPostMutation.isSuccess) {
      toast.success('Datos creados correctamente')

      setTimeout(() => {
        navigate('/expenses')
      }, 800)
    }
  }, [expensesPostMutation.isSuccess])

  return (
    <div>
      <Tooltip target='.custom-choose-btn' content='Choose' position='bottom' />
      <Tooltip target='.custom-upload-btn' content='Upload' position='bottom' />
      <Tooltip target='.custom-cancel-btn' content='Clear' position='bottom' />

      <FileUpload
        ref={fileUploadRef}
        name='demo[]'
        multiple
        accept={props.extensionsAccepted}
        maxFileSize={props.maxFileSize}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        customUpload
        uploadHandler={uploadHandler}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        disabled={isLoading || expensesPostMutation.isLoading || expensesPostMutation.isSuccess}
      />
    </div>
  )
}
