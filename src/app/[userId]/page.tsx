import Slider from "@/components/Slider";
import Temperature from "@/components/Temperature";
import Image from "next/image";

async function getData(userId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 

  if (!baseUrl) {
    throw new Error("API base URL is not defined");
  }

  const res = await fetch(`${baseUrl}/api/users/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { userId: string } }) {
  const data = await getData(params.userId);
  const { user, billingInfo, images } = data;

  return (
    <div className="flex md:items-center min-h-screen flex-col md:px-20 md:py-10 px-4 py-4">
      <h1 className="text-[45px] font-bold text-white mb-10 w-full text-center">TRD</h1>
      <div className="w-full flex md:h-[26px] md:items-center md:justify-between flex-col md:flex-row">
        <h2 className="text-[#CCCCCC] font-semibold text-[27px]">
          Hola {user.firstName} {user.lastName}
        </h2>
        <Temperature />
      </div>

      <div className="flex w-full flex-col md:flex-row justify-center gap-10 mt-10">
        <div className="md:w-1/2 w-full">
          <Slider slides={images} />
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-5">
          <div className="bg-[#181A1F] px-[16px] py-[24px] w-full border-[#272A33] rounded-xl flex flex-col gap-5">
            <h3 className="text-[#9396A5] font-[20px]">Información Personal</h3>
            <div className="tounded-md border-[#272A33] rounded-xl border p-2">
              <div className="font-normal text-[#9396A5] text-[14px]">Nombre</div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">{user.firstName}</div>
            </div>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">Apellido</div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">{user.lastName}</div>
            </div>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">Tipo de documento</div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">{user.documentType}</div>
            </div>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">
                Numero de documento
              </div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">
                {user.documentNumber}
              </div>
            </div>
            <div className="flex items-center gap-4 relative">
              <div className="bg-[#272A33] w-[54px] h-[56px] rounded-xl p-3 flex items-center justify-center">
                <div className="relative rounded-md">
                  <Image
                    src="/images/ecuador.png"
                    alt="Image"
                    className="object-cover w-[34px] h-[24px]"
                    width={34}
                    height={24}
                  />
                </div>
              </div>
              <div className="tounded-md border-[#272A33] rounded-xl border w-full p-2">
                <div className="font-normal text-[#9396A5] text-[14px]">
                  Numero de telefono
                </div>
                <div className="text-[16px] font-normal text-[#FFFFFF]">{user.phoneNumber}</div>
              </div>
            </div>
          </div>
          <div className="bg-[#181A1F] px-[16px] py-[24px] w-full border-[#272A33] rounded-xl flex flex-col gap-5">
            <h3 className="text-[#9396A5] font-[20px]">Datos de facturacion</h3>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">Nombre</div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">{billingInfo.firstName}</div>
            </div>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">Apellido</div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">{billingInfo.lastName}</div>
            </div>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">Tipo de documento</div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">{billingInfo.documentType}</div>
            </div>
            <div className="tounded-md border-[#272A33] rounded-xl border p-3">
              <div className="font-normal text-[#9396A5] text-[14px]">
                Numero de documento
              </div>
              <div className="text-[16px] font-normal text-[#FFFFFF]">
                {billingInfo.documentNumber}
              </div>
            </div>
            <div className="flex items-center gap-4 relative">
              <div className="bg-[#272A33] w-[54px] min-h-[56px] h-full rounded-xl p-3 flex items-center justify-center">
                <div className="relative rounded-md">
                  <Image
                    src="/images/ecuador.png"
                    alt="Image"
                    className="object-cover w-[34px] h-[24px]"
                    width={34}
                    height={24}
                  />
                </div>
              </div>
              <div className="tounded-md border-[#272A33] rounded-xl border p-3 w-full">
                <div className="font-normal text-[#9396A5] text-[14px]">
                  Numero de telefono
                </div>
                <div className="text-[16px] font-normal text-[#FFFFFF]">{billingInfo.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
