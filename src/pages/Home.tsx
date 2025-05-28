import Header from "@/components/Header"
import Journal from "@/components/Journal"

function Home() {

    return (
        <div className="w-[100vw] h-[100vh]">
            <div className="w-full h-[5%]">
                <Header />
            </div>
            <Journal />
        </div>
    )
}

export default Home