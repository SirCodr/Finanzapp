import { useRef, useState } from 'react'
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent} from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import { Tooltip } from 'primereact/tooltip'
import { toast } from 'sonner'
import { ProgressSpinner } from 'primereact/progressspinner'
import csv from 'csvtojson'

interface Props {
  extensionsAccepted: string
  maxFileSize: number
  isLoading: boolean
  onLoad?: (data: unknown[]) => Promise<void>
  uploadHandler: (data: unknown[]) => Promise<void>
}

interface FileWithUrl extends File {
  objectURL: string;
}


export default function UploadFile(props: Props) {
  const [totalSize, setTotalSize] = useState(0)
  const [sheetData, setSheetData] = useState<unknown[]>([])
  const[ isLoading, setLoading ] = useState<boolean>(false)
  const fileUploadRef = useRef<FileUpload>(null)
  
  async function handleFileUpload(e: FileUploadSelectEvent) {
  const file = e.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    try {
      setLoading(true);

      const fileContent = event.target?.result;
      if (typeof fileContent !== 'string') {
        throw new Error('Invalid file content');
      }

      const data = await csv({ output: 'csv' }).fromString(fileContent);

      setSheetData(data);

      if (props.onLoad) await props.onLoad(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error(error);
      setSheetData([]);
    } finally {
      setLoading(false);
    }
  };

  reader.readAsText(file);
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
    try {
      setLoading(true)
      await props.uploadHandler(sheetData)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
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

  const itemTemplate = (inFile: object) => {
    const file = inFile as FileWithUrl 

    if (isLoading) return (
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
          Arrastra y suelta la imagen aquí
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
      <Tooltip target='.custom-choose-btn' content='Elegir' position='bottom' />
      <Tooltip target='.custom-upload-btn' content='Subir' position='bottom' />
      <Tooltip target='.custom-cancel-btn' content='Cancelar' position='bottom' />

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
        disabled={isLoading}
      />
    </div>
  )
}
