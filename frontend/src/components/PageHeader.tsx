export function PageHeader() {
    return (
        <div className="flex items-center justify-between w-full min-h-[100px] px-10 py-6 relative bg-black">
            <div className="flex gap-5 items-center flex-shrink-0" style={{ paddingLeft: '40px' }}>
                <img 
                    src="/ontarioLogoClear.png" 
                    alt="Ontario Logo"
                    className="max-w-[150px] h-auto"
                />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
                <h1 className="text-5xl font-poppins font-bold text-center text-white">
                    Property Tax Look Up
                </h1>
            </div>
        </div>
    );
}
