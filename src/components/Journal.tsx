import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Bold, ClassicEditor, Essentials, Italic, Paragraph, FontFamily, Image, ImageCaption, ImageResize, ImageStyle, LinkImage, ImageUpload, ImageToolbar, Link } from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'
import './Journal.css'



function Journal() {

    return (
        <div className='m-0'>
            <CKEditor
                editor={ ClassicEditor }
                config={ {
                    licenseKey: 'GPL',
                    plugins: [ Essentials, Paragraph, Bold, Italic, FontFamily, ImageUpload, Image, ImageToolbar, ImageCaption, ImageResize, ImageStyle, LinkImage, Link ],
                    toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', 'fontFamily', '|', 'insertImage', 'link' ],
                    image: {
                        toolbar: [
                            'imageStyle:inline',
                            'imageStyle:side',
                            '|',
                            'toggleImageCaption',
                            'imageTextAlternative',
                            '|',
                            'linkImage',
                        ],
                        insert: {
                            type: 'inline',
                        }
                    },
                    initialData: '',
                } }
            />
        </div>
    )
}

export default Journal