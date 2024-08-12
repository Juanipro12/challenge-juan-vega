import { Field, ErrorMessage } from "formik";
import Image from "next/image";

const PersonalInfoForm = () => (
  <>
    <h3 className="text-[#9396A5] font-[20px]">Información Personal</h3>
    <div className="tounded-md border-[#272A33] rounded-xl border p-3  mt-4">
      <div className="font-normal text-[#9396A5] text-[14px]">Nombre</div>
      <Field
        name="firstName"
        type="text"
        className="text-[16px] font-normal text-[#FFFFFF] h-full w-full focus:border-b bg-transparent  text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0"
      />
    </div>
    <ErrorMessage
      name="firstName"
      component="div"
      className="text-red-500 text-xs p-2"
    />
    <div className="tounded-md border-[#272A33] rounded-xl border p-3  mt-4">
      <div className="font-normal text-[#9396A5] text-[14px]">Apellido</div>
      <Field
        name="lastName"
        type="text"
        className="text-[16px] font-normal text-[#FFFFFF] h-full w-full focus:border-b bg-transparent  text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0"
      />
    </div>
    <ErrorMessage
      name="lastName"
      component="div"
      className="text-red-500 text-xs p-2"
    />

    <div className="tounded-md border-[#272A33] rounded-xl border p-3  mt-4">
      <div className="font-normal text-[#9396A5] text-[14px]">
        Tipo de Documento
      </div>
      <Field
        as="select"
        name="documentType"
        className="text-[16px] font-normal text-[#FFFFFF] h-full w-full focus:border-b bg-transparent  text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0"
      >
        <option value="" className="text-black font-normal text-[14px">
          Seleccione...
        </option>
        <option value="cedula" className="text-black font-normal text-[14px">
          Cédula
        </option>
        <option value="ruc" className="text-black font-normal text-[14px">
          RUC
        </option>
        <option value="passport" className="text-black font-normal text-[14px">
          PASAPORTE
        </option>
      </Field>
    </div>
    <ErrorMessage
      name="documentType"
      component="div"
      className="text-red-500 text-xs p-2"
    />
    <div className="tounded-md border-[#272A33] rounded-xl border p-3 mt-4">
      <div className="font-normal text-[#9396A5] text-[14px]">
        Numero de Documento
      </div>
      <Field
        name="documentNumber"
        type="text"
        className="text-[16px] font-normal text-[#FFFFFF] h-full w-full focus:border-b bg-transparent  text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0"
      />
    </div>
    <ErrorMessage
      name="documentNumber"
      component="div"
      className="text-red-500 text-xs p-2"
    />
    <div className="tounded-md border-[#272A33] rounded-xl border p-3 mt-4">
      <div className="font-normal text-[#9396A5] text-[14px]">
        Correo Electrónico
      </div>
      <Field
        name="email"
        type="email"
        className="text-[16px] font-normal text-[#FFFFFF] h-full w-full focus:border-b bg-transparent text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0"
      />
    </div>
    <ErrorMessage
      name="email"
      component="div"
      className="text-red-500 text-xs p-2"
    />
    <div className="flex items-center gap-4 relative mt-4">
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
        <Field
          name="phoneNumber"
          type="text"
          className="text-[16px] font-normal text-[#FFFFFF] h-full w-full focus:border-b bg-transparent  text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0"
        />
      </div>
    </div>
    <ErrorMessage
      name="phoneNumber"
      component="div"
      className="text-red-500 text-xs p-2"
    />
  </>
);

export default PersonalInfoForm;
