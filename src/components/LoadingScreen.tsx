
const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 items-center justify-center bg-gray-900 z-50 flex flex-col gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFFFFF]" />
            <h3 className="font-semibold text-[27px] text-[#FFFFFF] text-center">Estamos validando tus <br /> datos</h3>
        </div>
    );
};

export default LoadingScreen;
