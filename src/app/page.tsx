import FormCard from "@/components/FormCard";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
    <h1 className="md:text-[128px] text-6xl font-normal text-[#9396A5] leading-[152.75px]">
      Challenge
    </h1>
    <h2 className="md:text-[45px] text-3xl font-bold text-white">TRD</h2>
    <div className="md:w-1/3 px-4 my-10">
      <FormCard/>
    </div>
  </div>
  );
}
