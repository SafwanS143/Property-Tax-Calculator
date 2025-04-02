export function WelcomeLayout() {
    return (
      <div className="flex flex-col items-center justify-between min-h-[150px]">
        <div className="text-center flex-1 flex flex-col justify-center pt-12 pb-6">
          <h2 className="text-black text-4xl font-bold">Welcome</h2>
          <h3 className="text-black text-xl mt-4">Enter municipality and property number or enter your property number directly.</h3>
        </div>
    
        <div className="h-[3px] bg-black w-[87%]"></div>
      </div> 
    );
  }
  