import { PanelLeftOpen } from 'lucide-react'
import { BookPlus } from 'lucide-react'



function Header() {
    const currDate = new Date()
    const formattedDate = `${String(currDate.getDate()).padStart(2, '0')} - ${String(currDate.toLocaleString('default', { month: 'short' }))} - ${currDate.getFullYear()}`

    return (
        <div className="w-full h-full bg-[#905fd4] p-2 flex justify-between items-center">
            <div className='w-[33.4%]'>
                <PanelLeftOpen
                    className="hover:cursor-pointer"
                    color='#ffffff'
                    strokeWidth={2}
                />
            </div>
            <div className="text-white font-semibold w-[33.4%] justify-center flex">
                Title, {formattedDate}
            </div>
            <div className="w-[33.4%] flex justify-end">
                <BookPlus
                    className="hover:cursor-pointer"
                    color='#ffffff'
                    strokeWidth={2}
                />
            </div>
        </div>
    )
}

export default Header