import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Bold, ClassicEditor, Essentials, Italic, Paragraph } from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

function Journal() {

    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                licenseKey: 'GPL',
                plugins: [ Essentials, Paragraph, Bold, Italic ],
                toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                initialData: 'Write you Journal here'
            } }
        />
    )
}

export default Journal